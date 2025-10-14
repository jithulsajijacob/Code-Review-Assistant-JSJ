from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from utils import review_code_with_llm
import os

load_dotenv()

app = FastAPI(title='Code Review Assistant JSJ')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/')
def home():
    return {'message': '✅ Code Review Assistant JSJ backend is running!'}

@app.post('/review')
async def review_code(file: UploadFile = File(...)):
    try:
        code_content = (await file.read()).decode('utf-8', errors='ignore')
    except Exception as e:
        return {'error': f'Failed to read file: {str(e)}'}

    feedback = review_code_with_llm(code_content)
    return {
        'file_name': file.filename,
        'code': code_content,
        'review': feedback
    }

FRONTEND_BUILD = os.path.join(os.path.dirname(__file__), 'frontend_build')
if os.path.isdir(FRONTEND_BUILD):
    app.mount('/', StaticFiles(directory=FRONTEND_BUILD, html=True), name='frontend')