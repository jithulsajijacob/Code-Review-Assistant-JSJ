import React, { useState } from "react";

export default function ReportCard({ title, content }) {
  const [open, setOpen] = useState(true);

  const renderContent = () => {
    if (!content && content !== 0)
      return (
        <p className="text-slate-400 dark:text-slate-500 italic">
          No details provided.
        </p>
      );

    if (
      typeof content === "object" &&
      (content.error || content._raw_model_output || content.raw_output)
    ) {
      const raw =
        content._raw_model_output ||
        content.raw_output ||
        content.error ||
        JSON.stringify(content);
      return (
        <pre className="whitespace-pre-wrap text-xs text-slate-700 dark:text-slate-200">
          {raw}
        </pre>
      );
    }

    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {content.map((item, i) => (
            <li
              key={i}
              className="text-slate-700 dark:text-slate-200 break-words"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p className="text-slate-700 dark:text-slate-200 break-words">
        {content}
      </p>
    );
  };

  return (
    <div
      className={`rounded-2xl shadow-sm p-4 transition-all duration-300 hover:shadow-md border 
        bg-white border-slate-200 text-slate-800
        dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>
      <div className={`mt-3 ${open ? "block" : "hidden"}`}>
        {renderContent()}
      </div>
    </div>
  );
}
