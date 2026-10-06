import React, { useState } from "react";
import {
  Layers,
  ShieldAlert,
  Upload,
  Sparkles,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SampleCase, ForensicReport, ActiveEngineCore } from "./types";
import { SAMPLE_CASES } from "./utils/sampleCases";
import { parsePdfBufferForensics } from "./utils/pdfForensics";
import { Header } from "./components/Header";
import { VerdictBanner } from "./components/VerdictBanner";
import { ForensicAnalysisCoreView } from "./components/ForensicAnalysisCore/ForensicAnalysisCoreView";
import { CybersecurityCoreView } from "./components/CybersecurityCore/CybersecurityCoreView";
import { ReportExportModal } from "./components/ReportExportModal";
import { ToolsCheckModal } from "./components/ToolsCheckModal";
import { ToolkitManifestModal } from "./components/ToolkitManifestModal";
import { InvestigatorProfileModal } from "./components/InvestigatorProfileModal";
import { RootkitRecoveryModal } from "./components/RootkitRecoveryModal";
import { useLanguage } from "./context/LanguageContext";

export default function App() {
  const { language, t } = useLanguage();
  const [currentCase, setCurrentCase] = useState<SampleCase>(SAMPLE_CASES[0]);
  const [activeCore, setActiveCore] = useState<ActiveEngineCore>("ANALYSIS");
  const [lightweightMode, setLightweightMode] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isToolsModalOpen, setIsToolsModalOpen] = useState<boolean>(false);
  const [isManifestModalOpen, setIsManifestModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState<boolean>(false);

  // Handle custom PDF upload
  const handleFileUpload = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      alert(language === "ES" ? "Por favor seleccione un archivo .pdf válido." : "Please select a valid .pdf file.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const buffer = await file.arrayBuffer();
      const report = await parsePdfBufferForensics(buffer, file.name);

      const customCase: SampleCase = {
        id: `user-case-${Date.now()}`,
        name: `Upload: ${file.name}`,
        badge: `${report.veredictoFinal} - ${language === "ES" ? "RIESGO" : "RISK"} ${report.riesgoScore}%`,
        verdict: report.veredictoFinal,
        riskScore: report.riesgoScore,
        description: language === "ES" 
          ? `Archivo cargado por el usuario (${(file.size / 1024).toFixed(1)} KB). Análisis forense ejecutado localmente con BabaYaga Core.`
          : `User-uploaded file (${(file.size / 1024).toFixed(1)} KB). Forensic analysis executed locally with BabaYaga Core.`,
        tamperVector:
          report.cicatrices.length > 0
            ? report.cicatrices.map((c) => c.title).join(" + ")
            : t.cleanFileMessage,
        data: report,
      };

      setCurrentCase(customCase);
      setActiveCore("ANALYSIS");

      if (report.veredictoFinal === "LIMPIO" && !lightweightMode) {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.85 },
          colors: ["#10b981", "#34d399", "#059669"],
        });
      }
    } catch (err: any) {
      console.error("Error analyzing PDF:", err);
      alert(`${language === "ES" ? "Error procesando archivo PDF" : "Error processing PDF file"}: ${err.message || err}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Drag and Drop listeners
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const report = currentCase.data;

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="min-h-screen bg-[#0d1117] text-[#f0f6fc] flex flex-col selection:bg-[#1f6feb40] selection:text-[#58a6ff] relative font-sans"
    >
      {/* Drag & Drop Visual Overlay */}
      {isDraggingFile && (
        <div className="fixed inset-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-4 border-dashed border-[#58a6ff] flex flex-col items-center justify-center p-6 pointer-events-none">
          <Upload className="w-16 h-16 text-[#58a6ff] animate-bounce mb-4" />
          <h2 className="text-2xl font-bold font-mono text-[#f0f6fc]">
            {t.dropFileTitle}
          </h2>
          <p className="text-sm font-mono text-[#8b949e] mt-2">
            {t.dropFileSubtitle}
          </p>
        </div>
      )}

      {/* Header with Dual-Core Selector & Lightweight mode & Language button */}
      <Header
        currentCase={currentCase}
        sampleCases={SAMPLE_CASES}
        activeCore={activeCore}
        onChangeCore={(core) => setActiveCore(core)}
        lightweightMode={lightweightMode}
        onToggleLightweight={() => setLightweightMode(!lightweightMode)}
        onSelectCase={(c) => {
          setCurrentCase(c);
          if (c.verdict === "LIMPIO" && !lightweightMode) {
            confetti({
              particleCount: 35,
              spread: 50,
              origin: { y: 0.8 },
              colors: ["#238636", "#58a6ff"],
            });
          }
        }}
        onFileUpload={handleFileUpload}
        onOpenToolsModal={() => setIsToolsModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenManifestModal={() => setIsManifestModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenRecoveryModal={() => {
          setActiveCore("CYBERSECURITY");
          setIsRecoveryModalOpen(true);
        }}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Core Switch Navigation Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-[#161b22] border border-[#30363d]">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-md ${
                activeCore === "ANALYSIS"
                  ? "bg-[#1f6feb26] border border-[#388bfd] text-[#58a6ff]"
                  : "bg-[#da363326] border border-[#da3633] text-[#f85149]"
              }`}
            >
              {activeCore === "ANALYSIS" ? (
                <Layers className="w-5 h-5" />
              ) : (
                <ShieldAlert className="w-5 h-5" />
              )}
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8b949e]">
                {t.activeCoreIndicator}
              </div>
              <h2 className="text-sm sm:text-base font-bold text-[#f0f6fc] font-mono">
                {activeCore === "ANALYSIS"
                  ? t.core1NameLong
                  : t.core2NameLong}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCore(activeCore === "ANALYSIS" ? "CYBERSECURITY" : "ANALYSIS")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCore === "ANALYSIS"
                  ? "bg-[#da363315] hover:bg-[#da363325] border-[#da3633] text-[#f85149]"
                  : "bg-[#1f6feb15] hover:bg-[#1f6feb25] border-[#388bfd] text-[#58a6ff]"
              }`}
            >
              <span>
                {activeCore === "ANALYSIS" ? t.switchToCore2 : t.switchToCore1}
              </span>
            </button>
          </div>
        </div>

        {/* Conditional Rendering of the Active Core */}
        {activeCore === "ANALYSIS" ? (
          <div className="space-y-6">
            {/* Top Verdict Banner */}
            <VerdictBanner
              report={report}
              onOpenReport={() => setIsReportModalOpen(true)}
              onAskAi={() => {
                setActiveCore("CYBERSECURITY");
              }}
            />

            {/* Forensic Analysis Core Modular View */}
            <ForensicAnalysisCoreView report={report} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cybersecurity & DFIR Core Modular View */}
            <CybersecurityCoreView
              report={report}
              onOpenRecoveryModal={() => setIsRecoveryModalOpen(true)}
              onOpenToolsModal={() => setIsToolsModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363d] bg-[#161b22] py-4 mt-12 text-xs font-mono text-[#8b949e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[#58a6ff] font-bold">ANDRETAKER</span>
            <span className="text-[#30363d]">•</span>
            <span className="text-[#c9d1d9]">BabaYaga Core v2.1</span>
            <span className="text-[#30363d]">•</span>
            <span>{t.footerStandard}</span>
          </div>
          <div className="flex items-center gap-3 text-[#8b949e]">
            <span>ISO/IEC 27037</span>
            <span>•</span>
            <span>qpdf</span>
            <span>•</span>
            <span>exiftool</span>
            <span>•</span>
            <span>benford 2BL</span>
            <span>•</span>
            <span>{t.witnessCount}</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ReportExportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        report={report}
      />

      <ToolsCheckModal
        isOpen={isToolsModalOpen}
        onClose={() => setIsToolsModalOpen(false)}
      />

      <ToolkitManifestModal
        isOpen={isManifestModalOpen}
        onClose={() => setIsManifestModalOpen(false)}
      />

      <InvestigatorProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      <RootkitRecoveryModal
        isOpen={isRecoveryModalOpen}
        onClose={() => setIsRecoveryModalOpen(false)}
      />
    </div>
  );
}
