import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import ReportCard from "./ReportCard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function FileUpload({ darkMode }) {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setReport(null);
    setError(null);
  };

  // Upload file and request AI review
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/review", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setReport(res.data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Upload failed. Please check your backend or API key.");
    } finally {
      setLoading(false);
    }
  };

  // Detect language
  const getLanguage = (filename) => {
    const ext = filename.split(".").pop();
    return (
      {
        py: "python",
        js: "javascript",
        cpp: "cpp",
        java: "java",
        html: "html",
      }[ext] || "text"
    );
  };

  // 📄 Generate PDF
  const handleDownloadPDF = () => {
    if (!report) return;
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Code Review Assistant JSJ", 10, 20);
    doc.setFontSize(12);
    doc.text(`File: ${report.file_name}`, 10, 30);

    let y = 45;
    const wrap = (t) => doc.splitTextToSize(t, 180);
    const add = (title, text) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      const arr = Array.isArray(text) ? text : [text || "No details."];
      arr.forEach((t) => {
        const lines = wrap(`• ${t}`);
        doc.text(lines, 10, y);
        y += 6 * lines.length;
      });
      y += 5;
    };
    add("Readability", report.review.readability);
    add("Modularity", report.review.modularity);
    add("Potential Bugs", report.review.potential_bugs);
    add("Suggestions", report.review.suggestions);
    doc.save(`CodeReview_${report.file_name}.pdf`);
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg space-y-6 transition-all duration-700 ${
        darkMode
          ? "bg-slate-800 text-slate-100 border border-slate-700"
          : "bg-white text-slate-900 border border-slate-200"
      }`}
    >
      {/* Upload Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            type="file"
            accept=".py,.js,.cpp,.java,.html,.txt"
            onChange={handleFileChange}
            className={`flex-1 md:flex-none cursor-pointer rounded-md border text-sm font-semibold transition-all duration-500
              file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 
              file:text-sm file:font-semibold 
              ${
                darkMode
                  ? "file:bg-slate-700 file:text-slate-100 bg-slate-800 border-slate-600 text-slate-100 hover:file:bg-slate-600"
                  : "file:bg-slate-200 file:text-slate-800 bg-white border-slate-200 text-slate-800 hover:file:bg-slate-300"
              }`}
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-5 py-2 rounded-md font-semibold transition-all duration-500 ${
              loading
                ? "bg-slate-400 text-white cursor-not-allowed"
                : darkMode
                ? "bg-blue-700 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Analyzing..." : "Upload & Review"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className={`font-medium p-3 rounded-lg transition-all duration-500 ${
            darkMode
              ? "bg-red-900 text-red-200 border border-red-800"
              : "bg-red-50 text-red-600 border border-red-200"
          }`}
        >
          {error}
        </div>
      )}

      {/* Review Report */}
      {report && (
        <div className="space-y-6 transition-all duration-700">
          {/* Code Viewer */}
          <div
            className={`rounded-lg shadow-md p-4 overflow-x-auto transition-all duration-700 border ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-slate-100"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <h2
              className={`text-xl font-semibold mb-3 ${
                darkMode ? "text-slate-100" : "text-slate-800"
              }`}
            >
              📄 {report.file_name}
            </h2>
            <SyntaxHighlighter
              key={darkMode ? "dark" : "light"} // Force re-render
              language={getLanguage(report.file_name)}
              style={darkMode ? oneDark : oneLight}
              showLineNumbers
              customStyle={{
                borderRadius: "10px",
                padding: "1rem",
                fontSize: "0.9rem",
                background: darkMode ? "#1e293b" : "#f9fafb",
                border: darkMode ? "1px solid #334155" : "1px solid #e5e7eb",
                color: darkMode ? "#f8fafc" : "#0f172a",
                transition: "all 0.7s ease-in-out",
              }}
            >
              {report.code}
            </SyntaxHighlighter>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportCard
              title="Readability"
              content={report.review.readability}
            />
            <ReportCard title="Modularity" content={report.review.modularity} />
            <ReportCard
              title="Potential Bugs"
              content={report.review.potential_bugs}
            />
            <ReportCard
              title="Suggestions"
              content={report.review.suggestions}
            />
          </div>

          {/* Download PDF Button */}
          <div className="text-center">
            <button
              onClick={handleDownloadPDF}
              className={`mt-6 px-6 py-2 rounded-md font-semibold transition-all duration-500 ${
                darkMode
                  ? "bg-green-700 hover:bg-green-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              📄 Download Review as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
