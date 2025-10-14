import os, json, time, re
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY", "")

DEFAULTS = {
    "readability": "No specific readability feedback was generated. The code appears generally understandable.",
    "modularity": "No specific modularity feedback available. The code structure seems fine.",
    "potential_bugs": ["No potential bugs detected in this snippet."],
    "suggestions": ["No improvement suggestions provided by the model."],
}


def _ensure_defaults(review: dict) -> dict:
    out = {}
    for k, v in DEFAULTS.items():
        if k in review and review[k] not in (None, "", [], {}):
            out[k] = review[k]
        else:
            out[k] = v
    return out


def _extract_json_by_key(text: str, key: str = "readability"):
    matches = re.findall(r"\{[\s\S]*?\}", text)
    for m in matches:
        if f'"{key}"' in m:
            return m
    return None


def _parse_model_output(content: str) -> dict:
    try:
        return json.loads(content)
    except Exception:
        m = _extract_json_by_key(content, "readability")
        if m:
            try:
                return json.loads(m)
            except Exception:
                pass
    return {}


def review_code_with_llm(code: str, max_retries: int = 2) -> dict:
    prompt = f"""You are a senior software engineer and code reviewer.
Provide a detailed review of the following code. Return ONLY valid JSON in this exact format (no markdown):
{{
  "readability": "string (2-4 sentences)",
  "modularity": "string (2-4 sentences)",
  "potential_bugs": ["string", "..."],
  "suggestions": ["string", "..."]
}}
Ensure every field is non-empty. If nothing notable, write a brief confirming sentence.
Code:
{code}
"""

    models_to_try = ["gpt-3.5-turbo", "gpt-4"]
    last_err = None

    for attempt in range(1, max_retries + 1):
        for model in models_to_try:
            try:
                print(f"🔍 Attempt {attempt}: Using model {model}")
                response = openai.ChatCompletion.create(
                    model=model,
                    messages=[
                        {
                            "role": "system",
                            "content": "You are an expert code reviewer that always returns structured JSON.",
                        },
                        {"role": "user", "content": prompt},
                    ],
                    temperature=0.2,
                    max_tokens=1200,
                )
                content = response["choices"][0]["message"]["content"].strip()
                if os.getenv("DEBUG_LLM", "false").lower() == "true":
                    print(
                        "=== RAW MODEL OUTPUT ===\n",
                        content,
                        "\n=== END RAW OUTPUT ===",
                    )
                parsed = _parse_model_output(content)
                if not parsed:
                    return {**DEFAULTS, "_raw_model_output": content}
                return _ensure_defaults(parsed)
            except Exception as e:
                last_err = str(e)
                print(f"⚠️ Model {model} failed: {last_err}")
                if any(
                    msg in last_err.lower()
                    for msg in [
                        "does not exist",
                        "not have access",
                        "rate limit",
                        "quota",
                    ]
                ):
                    continue
                time.sleep(1)
                continue
    return {"error": "All model attempts failed", "detail": last_err or "unknown"}
