# 🧠 Code Review Assistant JSJ

**An AI-powered code review web application** that analyzes source code for **readability, modularity, and potential bugs**, and provides **actionable improvement suggestions** — just like a human code reviewer.

Developed by **Jithul Saji Jacob**

---

## 🎥 Demo Video  
🎬 [Watch the Demo on YouTube](https://youtu.be/your-demo-link-here)

---

## 🚀 Project Overview

Code Review Assistant JSJ automates the process of reviewing code by integrating **AI-based natural language analysis**.  
It helps developers save time and maintain better code quality by automatically identifying readability issues, poor structure, and potential bugs.

The project consists of two main components:

- 🧩 **Backend (FastAPI)** — Handles file uploads, processes code, communicates with OpenAI’s GPT model, and returns structured feedback in JSON format.  
- 🎨 **Frontend (React + Tailwind CSS)** — Provides an interactive dashboard for uploading code, viewing AI-generated insights, toggling light/dark modes, and downloading detailed PDF reports.

---

## 🧩 Features

✅ Upload and analyze source code files (`.py`, `.js`, `.cpp`, etc.)  
✅ Automatic LLM-based code analysis (GPT-powered)  
✅ Insights on:
- Readability  
- Modularity  
- Potential Bugs  
- Improvement Suggestions  
✅ Syntax-highlighted code viewer  
✅ Downloadable **PDF report**  
✅ Responsive design with full **Dark/Light Mode** support  
✅ Extensible backend API (ready for database or auth integration)

---

**Workflow Summary:**
1. The user uploads a source code file from the frontend.
2. The backend reads and sends the file content to the OpenAI model via API.
3. The LLM analyzes code readability, modularity, and bugs.
4. The backend formats the response into structured JSON.
5. The frontend displays formatted insights and allows PDF export.

---

## 🧠 Example Output

```json
{
  "readability": "The function names are clear but could include more comments.",
  "modularity": "Consider splitting long functions into smaller, reusable components.",
  "potential_bugs": [
    "Variable 'total' is not declared before use.",
    "Null comparison might fail for non-primitive types."
  ],
  "suggestions": [
    "Use strict equality (===) in JavaScript comparisons.",
    "Add inline comments for better readability."
  ]
}
```

---

## 🧰 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, Tailwind CSS, Axios |
| **Backend** | FastAPI (Python) |
| **AI/LLM** | OpenAI GPT-3.5-turbo |
| **Utilities** | jsPDF, Prism.js |
| **Version Control** | Git + GitHub |

---

## ⚙️ Installation & Setup

### 🖥️ **1. Clone the Repository**
```bash
git clone https://github.com/jithulsajijacob/Code-Review-Assistant-JSJ.git
cd Code-Review-Assistant-JSJ
```

### 🧠 **2. Backend Setup**
```bash
cd backend
python -m venv venv
source venv/Scripts/activate   # (Windows)
pip install -r requirements.txt
```

Create a `.env` file and add your OpenAI API key:
```
OPENAI_API_KEY=your-api-key-here
```

Run the backend:
```bash
uvicorn main:app --reload
```

### 💻 **3. Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
```

Access the app at:
👉 `http://localhost:5173/`


---

## 💬 Prompt Used for LLM

> “Review this code for readability, modularity, and potential bugs, then provide improvement suggestions in structured JSON format.”

---

## 🧱 Folder Structure

```
Code-Review-Assistant-JSJ/
│
├── backend/
│   ├── main.py
│   ├── utils.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## 🌟 Future Enhancements

- 🗃️ Database integration for saving previous reports  
- 👥 User authentication for personal dashboards  
- 🧩 Multi-file project analysis support  
- 📊 Visual code metrics and graphs  
- 🔄 Integration with GitHub repositories for automated PR reviews  

---

## 🧾 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute with proper credit.

---

## 👨‍💻 Developer

**👤 Jithul Saji Jacob**  
📧 [jithulsajijacob@gmail.com](mailto:jithulsajijacob@gmail.com)  
🌐 [GitHub: jithulsajijacob](https://github.com/jithulsajijacob)

---

## 🏁 Conclusion

> **Code Review Assistant JSJ** automates the process of reviewing source code using AI, delivering consistent and meaningful insights in seconds.  
>  
> It enhances productivity, improves software quality, and helps developers focus on writing better code.
