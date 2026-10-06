import React, { useState } from "react";
import {
  X,
  Download,
  Copy,
  Check,
  FileText,
  Printer,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { ForensicReport } from "../types";
import { InvestigatorAvatar } from "./InvestigatorAvatar";

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ForensicReport;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeFormat, setActiveFormat] = useState<"MARKDOWN" | "JSON">(
    "MARKDOWN"
  );

  if (!isOpen) return null;

  const handleCopy = () => {
    const text =
      activeFormat === "MARKDOWN"
        ? report.rawMarkdownReport
        : JSON.stringify(report, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text =
      activeFormat === "MARKDOWN"
        ? report.rawMarkdownReport
        : JSON.stringify(report, null, 2);
    const ext = activeFormat === "MARKDOWN" ? "md" : "json";
    const mime = activeFormat === "MARKDOWN" ? "text/markdown" : "application/json";
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `andretaker_report_${report.fileName.replace(/\.pdf$/i, "")}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]">
          <div className="flex items-center gap-3">
            <InvestigatorAvatar size="sm" showBadge={true} />
            <div>
              <h3 className="text-sm font-bold font-mono text-[#f0f6fc]">
                ANDRETAKER REPORT — EXPERT FORENSIC AFFIDAVIT (BABAYAGA CORE)
              </h3>
              <p className="text-xs text-[#8b949e] font-mono">
                Investigator: Andrea Zabala (AnZaCa) • {report.fileName} • {report.analyzedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#161b22] p-1 rounded-md border border-[#30363d] text-xs font-mono">
              <button
                onClick={() => setActiveFormat("MARKDOWN")}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeFormat === "MARKDOWN"
                    ? "bg-[#21262d] text-[#58a6ff] font-bold border border-[#388bfd66]"
                    : "text-[#8b949e] hover:text-[#f0f6fc]"
                }`}
              >
                Markdown (.md)
              </button>
              <button
                onClick={() => setActiveFormat("JSON")}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  activeFormat === "JSON"
                    ? "bg-[#21262d] text-[#58a6ff] font-bold border border-[#388bfd66]"
                    : "text-[#8b949e] hover:text-[#f0f6fc]"
                }`}
              >
                JSON Payload
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="p-2 rounded-md bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
              title="Print affidavit"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-md bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0d1117] font-mono text-xs text-[#c9d1d9] select-all">
          <pre className="whitespace-pre-wrap leading-relaxed text-[#c9d1d9] bg-[#161b22] p-4 rounded-lg border border-[#30363d]">
            {activeFormat === "MARKDOWN"
              ? report.rawMarkdownReport
              : JSON.stringify(report, null, 2)}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#30363d] bg-[#0d1117] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e]">
            <span>SHA-256 Hash:</span>
            <span className="text-[#f0f6fc] font-bold truncate max-w-xs">{report.sha256}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-md bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-[#f0f6fc] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#3fb950]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy Text"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs font-mono transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {activeFormat === "MARKDOWN" ? "andretaker_report.md" : "payload.json"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
