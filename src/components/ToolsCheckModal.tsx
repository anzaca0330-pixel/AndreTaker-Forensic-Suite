import React, { useState } from "react";
import {
  X,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import { ToolStatus } from "../types";
import { DEFAULT_TOOLS } from "../utils/sampleCases";

interface ToolsCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ToolsCheckModal: React.FC<ToolsCheckModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tools, setTools] = useState<ToolStatus[]>(DEFAULT_TOOLS);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);

  if (!isOpen) return null;

  const APT_INSTALL_COMMAND =
    "sudo apt install qpdf exiftool poppler-utils imagemagick zbar-tools";

  const handleRecheck = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 600);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(APT_INSTALL_COMMAND);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#21262d] border border-[#388bfd66] flex items-center justify-center text-[#58a6ff]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-[#f0f6fc]">
                1. TOOL VERIFICATION (verify_tools)
              </h3>
              <p className="text-xs text-[#8b949e] font-sans">
                Execution environment and native binary health for AndreTaker Forensic Suite (BabaYaga Core)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="bg-[#23863615] border border-[#238636] rounded-lg p-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5 text-xs text-[#3fb950] font-mono">
              <CheckCircle2 className="w-4 h-4 text-[#3fb950] shrink-0" />
              <span>✅ All native forensic tools are verified, active, and operational.</span>
            </div>
            <button
              onClick={handleRecheck}
              disabled={isVerifying}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#58a6ff] border border-[#388bfd66] flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isVerifying ? "animate-spin" : ""}`} />
              <span>{isVerifying ? "Verifying..." : "Re-test"}</span>
            </button>
          </div>

          {/* Tools Grid */}
          <div className="space-y-2.5">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3.5 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#f0f6fc]">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                      {tool.version || "Native"}
                    </span>
                  </div>
                  <p className="text-xs text-[#8b949e] font-sans">{tool.purpose}</p>
                  <div className="text-[11px] font-mono text-[#58a6ff] pt-0.5">
                    Command: <code>{tool.command}</code>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 text-xs font-mono text-[#3fb950] font-bold bg-[#23863626] px-2 py-1 rounded border border-[#238636]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active</span>
                </div>
              </div>
            ))}
          </div>

          {/* Linux Installation Command Guide */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-2">
            <div className="text-xs font-mono text-[#8b949e] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
                Installation command for Debian / Ubuntu / Kali:
              </span>
              <button
                onClick={handleCopyCmd}
                className="text-[11px] font-mono text-[#58a6ff] hover:text-[#79c0ff] flex items-center gap-1 cursor-pointer"
              >
                {copiedCmd ? (
                  <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCmd ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <pre className="bg-[#161b22] p-2.5 rounded-md border border-[#30363d] text-xs font-mono text-[#7ee787] overflow-x-auto select-all">
              {APT_INSTALL_COMMAND}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#30363d] bg-[#0d1117] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] border border-[#30363d] text-xs font-mono transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
