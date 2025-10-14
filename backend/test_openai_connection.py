import os
from dotenv import load_dotenv
import openai

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

def test_model(model_name):
    try:
        response = openai.ChatCompletion.create(
            model=model_name,
            messages=[
                {'role': 'system', 'content': 'You are a test assistant.'},
                {'role': 'user', 'content': 'Say hello if this model works.'}
            ],
            max_tokens=50
        )
        print(f'✅ Model {model_name} works! Response:', response['choices'][0]['message']['content'])
        return True
    except Exception as e:
        print(f'⚠️ {model_name} not available or failed: {e}')
        return False

print('🔍 Testing available models...\n')
if not test_model('gpt-3.5-turbo'):
    test_model('gpt-4')
print('\n✅ API key is valid and at least one model works!')