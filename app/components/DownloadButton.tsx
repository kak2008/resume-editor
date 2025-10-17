"use client";
import { useResume } from "./ResumeContext";
import { generateDocx } from "../lib/generateDocx";
import { Download } from "lucide-react";

export default function DownloadButton() {
  const { resume } = useResume();

  return (
    <button
      onClick={() => generateDocx(resume)}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-full shadow-md transition-all duration-200"
      title="Download Resume (DOCX)"
    >
      <Download className="w-4 h-4" />
      <span className="text-sm font-medium">Download</span>
    </button>
  );
}
