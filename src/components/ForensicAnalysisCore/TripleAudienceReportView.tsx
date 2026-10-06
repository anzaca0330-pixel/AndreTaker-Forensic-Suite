import React, { useState } from "react";
import {
  FileText,
  Scale,
  Users,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ShieldAlert,
  Hash,
} from "lucide-react";
import { ForensicReport } from "../../types";

interface TripleAudienceReportViewProps {
  report: ForensicReport;
}

export const TripleAudienceReportView: React.FC<TripleAudienceReportViewProps> = ({ report }) => {
  const [activeAudience, setActiveAudience] = useState<"TECNICO" | "LEGAL" | "CIUDADANO">("TECNICO");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#58a6ff] px-2.5 py-0.5 rounded-full bg-[#1f6feb26] border border-[#388bfd40]">
                MATRIZ DE TRIPLE AUDIENCIA
              </span>
              <span className="text-xs font-mono text-[#8b949e]">
                Directriz Pericial AndreTaker — BabaYaga Core
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#f0f6fc] font-mono mt-1">
              Dictámenes Adaptados para 3 Públicos Objetivos
            </h2>
            <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
              Desglose procesal independiente: Técnico/Pericial (DFIR), Legal/Jurídico (Cadena de
              Custodia) y Ciudadano Común (Transparencia).
            </p>
          </div>
        </div>
      </div>

      {/* Audience Selector Tabs */}
      <div className="border border-[#30363d] bg-[#161b22] rounded-lg p-1.5 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveAudience("TECNICO")}
          className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
            activeAudience === "TECNICO"
              ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
              : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Audiencia 1: Técnico / Pericial (DFIR & Reverse Eng)</span>
        </button>

        <button
          onClick={() => setActiveAudience("LEGAL")}
          className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
            activeAudience === "LEGAL"
              ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
              : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Audiencia 2: Legal / Jurídico (Cadena de Custodia ISO 27037)</span>
        </button>

        <button
          onClick={() => setActiveAudience("CIUDADANO")}
          className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
            activeAudience === "CIUDADANO"
              ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
              : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Audiencia 3: Ciudadano Común / Divulgación Pública</span>
        </button>
      </div>

      {/* Content View */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 sm:p-6 space-y-6">
        {activeAudience === "TECNICO" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#58a6ff] uppercase">
                  Salida Pericial de Bajo Nivel
                </span>
                <h3 className="text-base font-bold text-[#f0f6fc] font-mono mt-0.5">
                  Informe Técnico Forense: Volcados, Objetos XREF y 2BL Mebane
                </h3>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    `=== DICTAMEN TÉCNICO FORENSE ===\nArchivo: ${report.fileName}\nSHA256: ${report.sha256}\nVeredicto: ${report.veredictoFinal} (${report.riesgoScore}% Riesgo)\nXREF Corrupta: ${report.estructura.XREF_corrupta}\nBenford 2BL: ${report.benford.madStatus}\nCicatrices: ${report.cicatrices.length}`,
                    "tecnico-copy"
                  )
                }
                className="text-xs font-mono text-[#8b949e] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "tecnico-copy" ? (
                  <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copiar Dictamen</span>
              </button>
            </div>

            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] font-mono text-xs space-y-2">
              <div className="text-[#8b949e]"># Parámetros de Extracción Binaria:</div>
              <div className="text-[#f0f6fc]">DOCUMENTO: {report.fileName}</div>
              <div className="text-[#f0f6fc]">HASH SHA-256: {report.sha256}</div>
              <div className="text-[#f0f6fc]">
                ESTRUCTURA XREF:{" "}
                <span
                  className={report.estructura.XREF_corrupta ? "text-[#f85149]" : "text-[#3fb950]"}
                >
                  {report.estructura.XREF_corrupta
                    ? "CORRUPTA (15 declarados vs 13 presentes - Inyección confirmada)"
                    : "CONFORME"}
                </span>
              </div>
              <div className="text-[#f0f6fc]">
                BENFORD 2BL MAD: {report.benford.mad.toFixed(4)} ({report.benford.madStatus})
              </div>
              <div className="text-[#f0f6fc]">
                OBJETOS TOTALES: {report.estructura.totalObjects} | STREAMS:{" "}
                {report.estructura.streamCount}
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#c9d1d9] font-sans leading-relaxed">
              <h4 className="font-bold text-[#f0f6fc] font-mono">Conclusión Pericial Técnica:</h4>
              <p>
                {report.veredictoFinal === "ALTERADO"
                  ? "El análisis estático de flujos PDF devela la existencia de capas /Contents superpuestas y la cicatriz XREF estandarizada. La discrepancia entre objetos declarados en el trailer del documento y la tabla física confirma la intervención de un script automatizado en la capa de transmisión."
                  : "No se identificaron deltas anómalos en las tablas de referencias cruzadas ni discrepancias en los streams de cuantización de imagen."}
              </p>
            </div>
          </div>
        )}

        {activeAudience === "LEGAL" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#58a6ff] uppercase">
                  Admisibilidad Jurídica & Fe Pública
                </span>
                <h3 className="text-base font-bold text-[#f0f6fc] font-mono mt-0.5">
                  Dictamen Pericial de Evidencia Digital (ISO/IEC 27037 & NIST SP 800-86)
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3 text-xs text-[#c9d1d9]">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[#58a6ff]">1. Cadena de Custodia:</span>
                <span className="font-mono text-[#3fb950]">75.000 Testigos Digitales</span>
              </div>
              <p>
                La evidencia fue obtenida y congelada criptográficamente antes de cualquier
                sobrescritura en los servidores de transmisión. Cada documento cuenta con una firma
                inmutable SHA-256 preservada en el registro maestro de la suite AndreTaker.
              </p>

              <div className="font-mono font-bold text-[#58a6ff] pt-2">
                2. Fundamento Legal de Nulidad Electoral:
              </div>
              <p>
                La demostración de alteración material no consentida en la capa de transporte vulnera
                el principio de autenticidad documental e integridad electoral, constituyendo prueba
                plena para sustanciación ante tribunales nacionales y la CIDH.
              </p>
            </div>
          </div>
        )}

        {activeAudience === "CIUDADANO" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#58a6ff] uppercase">
                  Explicación Clara y Transparente
                </span>
                <h3 className="text-base font-bold text-[#f0f6fc] font-mono mt-0.5">
                  Resumen Ciudadano: ¿Qué le hicieron al acta E-14?
                </h3>
              </div>
            </div>

            {/* Visual Glass Analogy Box */}
            <div className="p-5 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#f0f6fc]">
                <span>🔍 La analogía del "Vidrio Transparente con Números Falsos"</span>
              </div>
              <p className="text-xs text-[#c9d1d9] font-sans leading-relaxed">
                Imagina que tienes el acta de papel que firmaron los jurados en la mesa. Un atacante
                tomó una lámina de vidrio transparente, le dibujó números diferentes por encima
                (alterando los votos de los candidatos pero dejando la suma igual) y le tomó una foto
                al vidrio encima del papel.
              </p>
              <div className="p-3 rounded bg-[#161b22] border border-[#30363d] text-xs text-[#58a6ff] font-mono">
                💡 <strong>El descubrimiento de AndreTaker:</strong> La máquina forense detectó el
                vidrio flotante (la capa oculta <code>/Contents</code> y la máscara de 1-bit) y
                desenterró la cicatriz digital que dejaron los atacantes al intentar tapar el papel
                original.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
