import React, { useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-700 flex items-start justify-center py-12 px-4 ${
        darkMode
          ? "bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100"
          : "bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900"
      }`}
    >
      <div className="w-full max-w-5xl">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold">
              Code Review Assistant JSJ
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              AI-powered code reviews with actionable insights.
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 text-sm rounded-md border transition-all duration-500 ${
              darkMode
                ? "border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-100"
                : "border-slate-300 bg-white hover:bg-slate-100 text-slate-800"
            }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        {/* Pass darkMode as prop */}
        <FileUpload darkMode={darkMode} />

        <footer className="mt-12 text-sm text-center text-slate-500 dark:text-slate-400">
          Made by <strong>Jithul Saji Jacob</strong>
        </footer>
      </div>
    </div>
  );
}
