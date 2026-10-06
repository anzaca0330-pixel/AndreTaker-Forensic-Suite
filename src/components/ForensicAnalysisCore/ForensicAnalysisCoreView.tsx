import React, { useState } from "react";
import {
  Layers,
  FileText,
  Image as ImageIcon,
  BarChart3,
  ShieldAlert,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { ForensicReport } from "../../types";
import { StructuralXrefTab } from "../StructuralXrefTab";
import { MetadataMatrixTab } from "../MetadataMatrixTab";
import { ImageArtifactsTab } from "../ImageArtifactsTab";
import { BenfordAnalysisTab } from "../BenfordAnalysisTab";
import { TripleAudienceReportView } from "./TripleAudienceReportView";

type ForensicSubTab =
  | "STRUCTURE"
  | "METADATA"
  | "IMAGES"
  | "BENFORD"
  | "SCARS"
  | "AUDIENCES";

interface ForensicAnalysisCoreViewProps {
  report: ForensicReport;
}

export const ForensicAnalysisCoreView: React.FC<ForensicAnalysisCoreViewProps> = ({ report }) => {
  const [activeSubTab, setActiveSubTab] = useState<ForensicSubTab>("STRUCTURE");

  return (
    <div className="space-y-6">
      {/* Sub Navigation Bar for Forensic Analysis Core */}
      <div className="border border-[#388bfd40] bg-[#161b22] rounded-lg p-1.5 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveSubTab("STRUCTURE")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "STRUCTURE"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>1. Estructura (XREF)</span>
            {report.estructura.XREF_corrupta && (
              <span className="w-2 h-2 rounded-full bg-[#f85149]"></span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab("METADATA")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "METADATA"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#d29922]" />
            <span>2. Metadatos</span>
            {(report.metadatos.discrepanciaTemporal || report.metadatos.producerMismatch) && (
              <span className="w-2 h-2 rounded-full bg-[#d29922]"></span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab("IMAGES")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "IMAGES"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#3fb950]" />
            <span>3. Imágenes (ELA / 1bpc)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e]">
              {report.imagenes.totalImages}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("BENFORD")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "BENFORD"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#bc8cff]" />
            <span>4. Benford 2BL (Mebane)</span>
            {report.benford.madStatus === "NON_CONFORMING" && (
              <span className="w-2 h-2 rounded-full bg-[#f85149]"></span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab("SCARS")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "SCARS"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#f85149]" />
            <span>5. Cicatrices Forenses</span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                report.cicatrices.length > 0
                  ? "bg-[#da363326] text-[#f85149] border border-[#da3633]"
                  : "bg-[#21262d] text-[#8b949e]"
              }`}
            >
              {report.cicatrices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("AUDIENCES")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "AUDIENCES"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 text-[#388bfd]" />
            <span>6. Dictamen 3 Audiencias</span>
          </button>
        </div>
      </div>

      {/* Sub views */}
      <div>
        {activeSubTab === "STRUCTURE" && (
          <StructuralXrefTab estructura={report.estructura} />
        )}

        {activeSubTab === "METADATA" && (
          <MetadataMatrixTab metadatos={report.metadatos} />
        )}

        {activeSubTab === "IMAGES" && (
          <ImageArtifactsTab imagenes={report.imagenes} />
        )}

        {activeSubTab === "BENFORD" && (
          <BenfordAnalysisTab benford={report.benford} />
        )}

        {activeSubTab === "SCARS" && (
          <div className="space-y-4">
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold font-mono text-[#f0f6fc] flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-[#f85149]" />
                    <span>Cicatrices Forenses Identificadas ({report.cicatrices.length})</span>
                  </h3>
                  <p className="text-xs text-[#8b949e] mt-0.5">
                    Evidencias deterministas y anomalías de inyección de bajo nivel desenterradas por Baba Yaga Core.
                  </p>
                </div>
              </div>

              {report.cicatrices.length === 0 ? (
                <div className="p-8 rounded-lg bg-[#0d1117] border border-[#238636]/40 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#3fb950] mx-auto" />
                  <h4 className="text-sm font-bold font-mono text-[#3fb950]">
                    Sin Cicatrices Estructurales ni Vectores de Alteración
                  </h4>
                  <p className="text-xs text-[#8b949e] font-sans max-w-md mx-auto">
                    Las tablas de referencias cruzadas, metadatos y distribución de dígitos concuerdan con un escaneo original auténtico.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {report.cicatrices.map((scar, idx) => (
                    <div
                      key={scar.id}
                      className={`p-4 rounded-lg border space-y-2 ${
                        scar.severity === "CRITICA" || scar.severity === "CRITICAL"
                          ? "bg-[#da363315] border-[#f85149]/40"
                          : scar.severity === "ALTA" || scar.severity === "HIGH"
                          ? "bg-[#d2992215] border-[#d29922]/40"
                          : "bg-[#0d1117] border-[#30363d]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                              scar.severity === "CRITICA" || scar.severity === "CRITICAL"
                                ? "bg-[#da363326] text-[#f85149] border-[#da3633]"
                                : scar.severity === "ALTA" || scar.severity === "HIGH"
                                ? "bg-[#d2992226] text-[#e3b341] border-[#bb8009]"
                                : "bg-[#21262d] text-[#c9d1d9] border-[#30363d]"
                            }`}
                          >
                            {scar.severity === "CRITICA" ? "CRÍTICA" : scar.severity === "ALTA" ? "ALTA" : scar.severity} • {scar.category}
                          </span>
                          <h4 className="text-sm font-bold text-[#f0f6fc]">
                            {idx + 1}. {scar.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-[#c9d1d9] font-sans leading-relaxed">
                        {scar.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#30363d] text-xs font-mono text-[#8b949e]">
                        <div>
                          <span className="text-[#8b949e]">Evidencia: </span>
                          <span className="text-[#f0f6fc]">{scar.evidence}</span>
                        </div>
                        <div>
                          <span className="text-[#8b949e]">Rastro Técnico: </span>
                          <code className="text-[#58a6ff]">{scar.technicalTrace}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeSubTab === "AUDIENCES" && <TripleAudienceReportView report={report} />}
      </div>
    </div>
  );
};
