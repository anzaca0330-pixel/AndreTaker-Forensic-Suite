import React, { useState } from "react";
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  Terminal,
  Calendar,
  Sparkles,
} from "lucide-react";
import { MetadataAnalysis } from "../types";

interface MetadataMatrixTabProps {
  metadatos: MetadataAnalysis;
}

export const MetadataMatrixTab: React.FC<MetadataMatrixTabProps> = ({
  metadatos,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"FIELDS" | "RAW_XMP" | "EXIFTOOL">(
    "FIELDS"
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Alert if Temporal Paradox or Producer Mismatch exists */}
      {(metadatos.discrepanciaTemporal || metadatos.producerMismatch) && (
        <div className="bg-[#d2992215] border border-[#d29922]/50 rounded-lg p-4 flex items-start gap-3 text-[#e3b341] shadow-sm">
          <AlertTriangle className="w-5 h-5 text-[#e3b341] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-sm font-mono text-[#f0f6fc]">
              Metadata Digital Fingerprint Anomaly
            </h4>
            {metadatos.discrepanciaTemporal && (
              <p className="text-[#c9d1d9]">• {metadatos.discrepanciaDetalle}</p>
            )}
            {metadatos.producerMismatch && (
              <p className="text-[#c9d1d9]">• {metadatos.producerDetails}</p>
            )}
          </div>
        </div>
      )}

      {/* Grid of Key Metadata Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Creator Tool */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 shadow-sm">
          <div className="text-xs font-mono text-[#8b949e] flex items-center justify-between">
            <span>Authoring Tool (Creator)</span>
            <Cpu className="w-3.5 h-3.5 text-[#58a6ff]" />
          </div>
          <div className="mt-2 text-sm font-bold font-mono text-[#f0f6fc] truncate" title={metadatos.creator || "N/A"}>
            {metadatos.creator || "Unspecified / Empty"}
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1 font-sans">
            Original authoring software declared in /Info dictionary.
          </p>
        </div>

        {/* Producer Tool */}
        <div className={`border rounded-lg p-4 shadow-sm ${
          metadatos.producerMismatch ? "border-[#d29922]/50 bg-[#d2992215]" : "bg-[#161b22] border-[#30363d]"
        }`}>
          <div className="text-xs font-mono text-[#8b949e] flex items-center justify-between">
            <span>Final Producer (Producer)</span>
            {metadatos.producerMismatch && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#d2992226] text-[#e3b341] border border-[#bb8009]">
                ALTERED
              </span>
            )}
          </div>
          <div className="mt-2 text-sm font-bold font-mono text-[#f0f6fc] truncate" title={metadatos.producer || "N/A"}>
            {metadatos.producer || "Unspecified / Empty"}
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1 font-sans">
            Library or engine that generated the final PDF bytes.
          </p>
        </div>

        {/* Temporal Matrix Delta */}
        <div className={`border rounded-lg p-4 shadow-sm ${
          metadatos.discrepanciaTemporal ? "border-[#f85149]/50 bg-[#da363315]" : "bg-[#161b22] border-[#30363d]"
        }`}>
          <div className="text-xs font-mono text-[#8b949e] flex items-center justify-between">
            <span>Timestamp Synchronization</span>
            <Clock className="w-3.5 h-3.5 text-[#58a6ff]" />
          </div>
          <div className="mt-2 text-sm font-bold font-mono text-[#f0f6fc]">
            {metadatos.discrepanciaTemporal ? "Time Gap / Paradox" : "Coherent Chronology"}
          </div>
          <p className="text-[11px] text-[#8b949e] mt-1 font-sans">
            Timestamp relationship between original creation and modification.
          </p>
        </div>
      </div>

      {/* Timeline Comparison Card */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 shadow-sm">
        <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[#58a6ff]" />
          <span>Chronological Timestamp Matrix</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Creation Date */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-3.5">
            <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-wider">
              Creation Date (CreateDate)
            </span>
            <div className="text-base font-bold font-mono text-[#3fb950] mt-1">
              {metadatos.createDate || "Not available"}
            </div>
            <div className="text-xs text-[#8b949e] mt-1 font-mono">
              /CreationDate tag & xmp:CreateDate
            </div>
          </div>

          {/* Modification Date */}
          <div className={`border rounded-md p-3.5 ${
            metadatos.discrepanciaTemporal
              ? "bg-[#da363326] border-[#da3633]"
              : "bg-[#0d1117] border-[#30363d]"
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#8b949e] uppercase tracking-wider">
                Modification Date (ModDate)
              </span>
              {metadatos.discrepanciaTemporal && (
                <span className="text-[10px] font-mono text-[#f85149] font-bold">
                  ⚠️ INCONSISTENT
                </span>
              )}
            </div>
            <div className={`text-base font-bold font-mono mt-1 ${
              metadatos.discrepanciaTemporal ? "text-[#f85149]" : "text-[#58a6ff]"
            }`}>
              {metadatos.modifyDate || "No modifications"}
            </div>
            <div className="text-xs text-[#8b949e] mt-1 font-mono">
              /ModDate tag & xmp:ModifyDate
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Tabs: Structured Fields vs Raw XMP vs Exiftool output */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#30363d] pb-3 mb-4">
          <button
            onClick={() => setActiveSubTab("FIELDS")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
              activeSubTab === "FIELDS"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc]"
            }`}
          >
            Full /Info Dictionary
          </button>
          <button
            onClick={() => setActiveSubTab("EXIFTOOL")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
              activeSubTab === "EXIFTOOL"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc]"
            }`}
          >
            ExifTool Output
          </button>
          <button
            onClick={() => setActiveSubTab("RAW_XMP")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
              activeSubTab === "RAW_XMP"
                ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc]"
            }`}
          >
            XMP XML Packet
          </button>
        </div>

        {activeSubTab === "FIELDS" && (
          <div className="space-y-2 text-xs font-mono">
            <div className="grid grid-cols-3 p-2.5 rounded-md bg-[#0d1117] border border-[#30363d]">
              <span className="text-[#8b949e]">Title (/Title):</span>
              <span className="col-span-2 text-[#f0f6fc]">{metadatos.title || "Unspecified"}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 rounded-md bg-[#0d1117] border border-[#30363d]">
              <span className="text-[#8b949e]">Author (/Author):</span>
              <span className="col-span-2 text-[#f0f6fc]">{metadatos.author || "Unspecified"}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 rounded-md bg-[#0d1117] border border-[#30363d]">
              <span className="text-[#8b949e]">Authoring Software (/Creator):</span>
              <span className="col-span-2 text-[#f0f6fc]">{metadatos.creator || "N/A"}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 rounded-md bg-[#0d1117] border border-[#30363d]">
              <span className="text-[#8b949e]">Producer Engine (/Producer):</span>
              <span className="col-span-2 text-[#f0f6fc]">{metadatos.producer || "N/A"}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5 rounded-md bg-[#0d1117] border border-[#30363d]">
              <span className="text-[#8b949e]">Software Fingerprint:</span>
              <span className="col-span-2 text-[#58a6ff] font-bold">
                {metadatos.softwareFingerprint || "Standard"}
              </span>
            </div>
          </div>
        )}

        {activeSubTab === "EXIFTOOL" && (
          <div>
            <div className="text-xs font-mono text-[#8b949e] mb-1.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Direct execution: exiftool -Creator -Producer -CreateDate -ModDate</span>
            </div>
            <pre className="bg-[#0d1117] border border-[#30363d] rounded-md p-3 text-xs font-mono text-[#7ee787] whitespace-pre-wrap">
              {metadatos.metadatos}
            </pre>
          </div>
        )}

        {activeSubTab === "RAW_XMP" && (
          <div>
            <div className="text-xs font-mono text-[#8b949e] mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Embedded XMP Stream (&lt;x:xmpmeta&gt;):</span>
            </div>
            <pre className="bg-[#0d1117] border border-[#30363d] rounded-md p-3 text-xs font-mono text-[#c9d1d9] overflow-x-auto max-h-[300px]">
              {metadatos.rawXmp || `<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:pdf="http://ns.adobe.com/pdf/1.3/">
      <xmp:CreatorTool>${metadatos.creator || "PDF Creator"}</xmp:CreatorTool>
      <pdf:Producer>${metadatos.producer || "PDF Producer"}</pdf:Producer>
      <xmp:CreateDate>${metadatos.createDate || "2026-01-01T00:00:00Z"}</xmp:CreateDate>
      <xmp:ModifyDate>${metadatos.modifyDate || "2026-01-01T00:00:00Z"}</xmp:ModifyDate>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
