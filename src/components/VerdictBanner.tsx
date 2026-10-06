import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  FileCode,
  Hash,
  Layers,
  Clock,
  Sparkles,
  Download,
  Terminal,
} from "lucide-react";
import { ForensicReport } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface VerdictBannerProps {
  report: ForensicReport;
  onOpenReport: () => void;
  onAskAi: () => void;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({
  report,
  onOpenReport,
  onAskAi,
}) => {
  const { language, t } = useLanguage();
  const isAltered = report.veredictoFinal === "ALTERADO";
  const isSuspicious = report.veredictoFinal === "SOSPECHOSO";
  const isClean = report.veredictoFinal === "LIMPIO";

  const getRiskColor = (score: number) => {
    if (score >= 65) return "text-rose-400 border-rose-500/40 bg-rose-950/30";
    if (score >= 30) return "text-amber-400 border-amber-500/40 bg-amber-950/30";
    return "text-emerald-400 border-emerald-500/40 bg-emerald-950/30";
  };

  const getRiskBg = (score: number) => {
    if (score >= 65) return "bg-rose-500";
    if (score >= 30) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 sm:p-6 shadow-sm relative overflow-hidden">
      {/* Background subtle glow */}
      <div
        className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10 ${
          isAltered ? "bg-[#f85149]" : isSuspicious ? "bg-[#d29922]" : "bg-[#3fb950]"
        }`}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Verdict title & core statement */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide border ${
                isAltered
                  ? "bg-[#da363326] text-[#f85149] border-[#da3633]"
                  : isSuspicious
                  ? "bg-[#d2992226] text-[#e3b341] border-[#bb8009]"
                  : "bg-[#23863626] text-[#3fb950] border-[#238636]"
              }`}
            >
              {isAltered ? (
                <ShieldAlert className="w-4 h-4 text-[#f85149]" />
              ) : isSuspicious ? (
                <AlertTriangle className="w-4 h-4 text-[#e3b341]" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-[#3fb950]" />
              )}
              {isAltered
                ? language === "ES"
                  ? "ALTERACIÓN ESTRUCTURAL CONFIRMADA"
                  : "TAMPERING CONFIRMED"
                : isSuspicious
                ? language === "ES"
                  ? "INCONSISTENCIAS DETECTADAS"
                  : "INCONSISTENCIES DETECTED"
                : language === "ES"
                ? "ESTRUCTURA APARENTEMENTE ÍNTEGRA"
                : "APPARENTLY INTACT STRUCTURE"}
            </span>

            <span className="text-xs font-mono text-[#8b949e]">
              {language === "ES" ? "Analizado:" : "Analyzed:"} <span className="text-[#f0f6fc]">{report.analyzedAt}</span>
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#f0f6fc] flex items-center gap-2">
              <span>{report.veredictoTexto}</span>
            </h2>
            <p className="text-sm text-[#8b949e] leading-relaxed font-sans">
              {isAltered
                ? language === "ES"
                  ? `AndreTaker (BabaYaga Core) identificó ${report.cicatrices.length} cicatrices forenses críticas. La estructura de objetos internos y metadatos revelan inyección de capas sintéticas y manipulación en la capa de transmisión.`
                  : `AndreTaker (BabaYaga Core) identified ${report.cicatrices.length} critical forensic scars. Internal object structure and metadata provide direct evidence of synthetic layer injection and tampering.`
                : isSuspicious
                ? language === "ES"
                  ? `El documento exhibe anomalías estadísticas o discrepancias de marcas de tiempo que ameritan análisis pericial profundo.`
                  : `The document exhibits statistical anomalies or timestamp inconsistencies warranting expert scrutiny.`
                : language === "ES"
                ? `Las tablas de referencias cruzadas (XREF), metadatos y distribución de dígitos cumplen con los estándares de autenticidad documental.`
                : `Cross-reference (XREF) tables, metadata, and digit distributions strictly adhere to documentary consistency standards.`}
            </p>
          </div>

          {/* Quick telemetry badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#c9d1d9]">
              <FileCode className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>{report.fileName}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#c9d1d9]">
              <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>PDF {report.estructura.pdfVersion}</span>
              <span className="text-[#30363d]">|</span>
              <span>{report.estructura.incrementalRevisionsCount} rev.</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#c9d1d9]">
              <Hash className="w-3.5 h-3.5 text-[#d29922]" />
              <span className="truncate max-w-[140px]" title={report.sha256}>
                SHA-256: {report.sha256.substring(0, 10)}...
              </span>
            </div>
          </div>
        </div>

        {/* Right: Risk score gauge card */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 bg-[#0d1117] border border-[#30363d] rounded-lg p-4 min-w-[200px] shrink-0">
          <div className="text-center">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
              {t.riskScoreLabel}
            </div>
            <div className="flex items-baseline justify-center gap-1 my-1">
              <span
                className={`text-4xl font-extrabold font-mono ${
                  report.riesgoScore >= 65
                    ? "text-[#f85149]"
                    : report.riesgoScore >= 30
                    ? "text-[#e3b341]"
                    : "text-[#3fb950]"
                }`}
              >
                {report.riesgoScore}%
              </span>
            </div>

            {/* Risk bar meter */}
            <div className="w-36 h-2 bg-[#21262d] rounded-full overflow-hidden mx-auto my-1 border border-[#30363d]">
              <div
                className={`h-full rounded-full transition-all duration-700 ${getRiskBg(
                  report.riesgoScore
                )}`}
                style={{ width: `${Math.max(5, report.riesgoScore)}%` }}
              />
            </div>
            <div className="text-[10px] font-mono text-[#8b949e]">
              {report.cicatrices.length} {language === "ES" ? "Cicatrices Detectadas" : "Scars Detected"}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <button
              onClick={onAskAi}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#388bfd66] text-[#58a6ff] text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>{t.askAiAction}</span>
            </button>
            <button
              onClick={onOpenReport}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] hover:text-[#f0f6fc] text-xs font-mono transition-colors cursor-pointer"
            >
              <Download className="w-3 h-3 text-[#8b949e]" />
              <span>{t.viewReportAction}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
