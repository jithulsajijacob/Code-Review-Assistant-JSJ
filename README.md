# Code Review Assistant JSJ

Author: Jithul Saji Jacob

## Quick Start (local)

1. Backend:
```bash
cd backend
python -m venv venv
source venv/Scripts/activate   # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env
# edit .env and paste your OPENAI_API_KEY
python test_openai_connection.py  # optional test
uvicorn main:app --reload --port 8000
```

2. Frontend:
```bash
cd ../frontend
npm install
npm run dev
```

Open http://localhost:5173

## Notes
- Put your OpenAI API key in backend/.env (OPENAI_API_KEY=sk-...)
- DEBUG_LLM=true in .env will print raw model output to the backend console.