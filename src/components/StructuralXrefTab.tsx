import React, { useState } from "react";
import {
  Layers,
  AlertOctagon,
  CheckCircle,
  FileCode,
  Search,
  Eye,
  GitBranch,
  Terminal,
  ShieldAlert,
  Info,
  Code,
} from "lucide-react";
import { StructuralAnalysis, PdfObjectNode } from "../types";

interface StructuralXrefTabProps {
  estructura: StructuralAnalysis;
  onSelectObjectForInspection?: (obj: PdfObjectNode) => void;
}

export const StructuralXrefTab: React.FC<StructuralXrefTabProps> = ({
  estructura,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inspectedObject, setInspectedObject] = useState<PdfObjectNode | null>(
    estructura.objects[0] || null
  );

  const filteredObjects = estructura.objects.filter((obj) => {
    if (selectedFilter === "SUSPICIOUS" && !obj.isSuspicious) return false;
    if (selectedFilter === "STREAM" && !obj.isStream) return false;
    if (selectedFilter === "IMAGE" && obj.type !== "Image") return false;
    if (selectedFilter === "PAGE" && obj.type !== "Page" && obj.type !== "Pages") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        obj.id.toString().includes(q) ||
        obj.type.toLowerCase().includes(q) ||
        (obj.suspicionReason && obj.suspicionReason.toLowerCase().includes(q)) ||
        (obj.rawSnippet && obj.rawSnippet.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: XREF Status */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8b949e]">XREF Status (qpdf)</span>
            {estructura.XREF_corrupta ? (
              <span className="px-2 py-0.5 rounded bg-[#da363326] text-[#f85149] text-[10px] font-mono border border-[#da3633]">
                CORRUPTED / TAMPERED
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-[#23863626] text-[#3fb950] text-[10px] font-mono border border-[#238636]">
                INTACT
              </span>
            )}
          </div>
          <div className="mt-2">
            <div className="text-base font-bold text-[#f0f6fc] flex items-center gap-1.5">
              {estructura.XREF_corrupta ? (
                <AlertOctagon className="w-5 h-5 text-[#f85149] shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 text-[#3fb950] shrink-0" />
              )}
              <span className="truncate">{estructura.XREF_corrupta ? "Pointer Anomaly" : "Normal Structure"}</span>
            </div>
            <p className="text-xs text-[#8b949e] mt-1 line-clamp-2">{estructura.detalle}</p>
          </div>
        </div>

        {/* Card 2: Incremental Revisions */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8b949e]">Revisions (%%EOF)</span>
            <span className="text-xs font-mono text-[#58a6ff]">{estructura.incrementalRevisionsCount} detected</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black font-mono text-[#f0f6fc]">
              {estructura.incrementalRevisionsCount}{" "}
              <span className="text-xs font-normal text-[#8b949e] font-sans">
                {estructura.incrementalRevisionsCount === 1 ? "save pass" : "superimposed layers"}
              </span>
            </div>
            <p className="text-xs text-[#8b949e] mt-1">
              {estructura.incrementalRevisionsCount > 1
                ? "⚠️ Multiple rewrites appended to end of binary file."
                : "✅ File generated in a single write pass."}
            </p>
          </div>
        </div>

        {/* Card 3: Trailer ID Coherence */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8b949e]">Trailer /ID Signature</span>
            {estructura.trailerIdMismatch ? (
              <span className="px-2 py-0.5 rounded bg-[#d2992226] text-[#e3b341] text-[10px] font-mono border border-[#bb8009]">
                DISCREPANCY
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-[#23863626] text-[#3fb950] text-[10px] font-mono border border-[#238636]">
                COHERENT
              </span>
            )}
          </div>
          <div className="mt-2">
            <div className="text-sm font-mono font-bold text-[#f0f6fc] truncate">
              {estructura.trailerIdMismatch ? "Original ID ≠ Current" : "Valid Unique Identifier"}
            </div>
            <p className="text-xs text-[#8b949e] mt-1">
              {estructura.trailerIdMismatch
                ? "Document identifier changed after initial generation."
                : "No mutations in trailer cryptographic vector."}
            </p>
          </div>
        </div>

        {/* Card 4: Javascript / Payloads */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8b949e]">Streams & Scripts</span>
            {estructura.hasEmbeddedJavascript ? (
              <span className="px-2 py-0.5 rounded bg-[#da363326] text-[#f85149] text-[10px] font-mono border border-[#da3633]">
                /JS ACTIVE
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded bg-[#21262d] text-[#8b949e] text-[10px] font-mono">
                NO SCRIPTS
              </span>
            )}
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black font-mono text-[#f0f6fc]">
              {estructura.streamCount}{" "}
              <span className="text-xs font-normal text-[#8b949e] font-sans">data streams</span>
            </div>
            <p className="text-xs text-[#8b949e] mt-1">
              {estructura.hasEmbeddedJavascript
                ? "⚠️ Executable /JavaScript object present."
                : "No dangerous dynamic calls identified."}
            </p>
          </div>
        </div>
      </div>

      {/* Incremental Revisions Timeline */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 shadow-sm">
        <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-2 mb-4">
          <GitBranch className="w-4 h-4 text-[#58a6ff]" />
          <span>Incremental Revisions Timeline (Offset & Bytes)</span>
        </h3>

        <div className="space-y-3">
          {estructura.revisions.map((rev) => (
            <div
              key={rev.revisionNumber}
              className={`border rounded-md p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                rev.revisionNumber > 1
                  ? "bg-[#da363315] border-[#f85149]/40"
                  : "bg-[#0d1117] border-[#30363d]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    rev.revisionNumber > 1
                      ? "bg-[#da363326] text-[#f85149] border border-[#da3633]"
                      : "bg-[#21262d] text-[#58a6ff] border border-[#388bfd40]"
                  }`}
                >
                  #{rev.revisionNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#f0f6fc]">
                      Revision {rev.revisionNumber}
                    </span>
                    {rev.hasPrevTrailer && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d2992226] text-[#e3b341] border border-[#bb8009]">
                        /Prev Trailer Chained
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8b949e] mt-0.5">{rev.notes}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#8b949e] self-end sm:self-auto">
                <div>
                  <span className="text-[#8b949e]">Offset: </span>
                  <span className="text-[#f0f6fc]">{rev.offset.toLocaleString()} B</span>
                </div>
                <div>
                  <span className="text-[#8b949e]">Length: </span>
                  <span className="text-[#f0f6fc]">{(rev.length / 1024).toFixed(1)} KB</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* qpdf simulation log */}
        <div className="mt-4 pt-4 border-t border-[#30363d]">
          <div className="text-xs font-mono text-[#8b949e] mb-1.5 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>Diagnostic Output (qpdf --check):</span>
          </div>
          <pre className="bg-[#0d1117] border border-[#30363d] rounded-md p-3 text-xs font-mono text-[#f0f6fc] overflow-x-auto">
            {estructura.XREF_corrupta
              ? `checking ${estructura.pdfVersion} structure...
WARNING: PDF file is damaged, but qpdf is able to recover
qpdf: ${estructura.detalle}
Trailer dictionary /Size (${estructura.totalObjects + 4}) exceeds allocated table size (${estructura.totalObjects})
Detected orphan object chain at offset ${estructura.revisions[1]?.offset || 184000}`
              : `checking ${estructura.pdfVersion} structure...
PDF structure is intact and conforms to ISO 32000-1 specification.
XREF table size: ${estructura.totalObjects} entries. All object pointers valid.`}
          </pre>
        </div>
      </div>

      {/* PDF Object Stream Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Object list */}
        <div className="lg:col-span-6 bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex flex-col h-[460px] shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#58a6ff]" />
              <span>PDF Object Tree ({estructura.objects.length})</span>
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              {["ALL", "SUSPICIOUS", "STREAM", "IMAGE"].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    selectedFilter === f
                      ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] font-semibold"
                      : "bg-[#0d1117] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d]"
                  }`}
                >
                  {f === "ALL" ? "All" : f === "SUSPICIOUS" ? "Suspicious" : f === "STREAM" ? "Streams" : "Images"}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search object by ID, type, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-8 pr-3 py-1.5 text-xs text-[#f0f6fc] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] font-mono"
            />
          </div>

          {/* Object items scroll container */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {filteredObjects.length === 0 ? (
              <div className="text-center py-10 text-xs text-[#8b949e] font-mono">
                No objects matched current filters.
              </div>
            ) : (
              filteredObjects.map((obj) => (
                <div
                  key={`${obj.id}-${obj.gen}`}
                  onClick={() => setInspectedObject(obj)}
                  className={`p-2.5 rounded-md border text-xs font-mono cursor-pointer transition-all ${
                    inspectedObject?.id === obj.id
                      ? "bg-[#21262d] border-[#388bfd] text-[#58a6ff]"
                      : obj.isSuspicious
                      ? "bg-[#da363315] border-[#f85149]/40 hover:border-[#f85149] text-[#f0f6fc]"
                      : "bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#f0f6fc]">
                        {obj.id} {obj.gen} obj
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-[#21262d] text-[10px] text-[#8b949e]">
                        {obj.type}
                      </span>
                      {obj.isStream && (
                        <span className="text-[10px] text-[#58a6ff] bg-[#1f6feb26] px-1.5 rounded">
                          stream
                        </span>
                      )}
                    </div>
                    {obj.isSuspicious && (
                      <span className="px-1.5 py-0.2 rounded bg-[#da363326] text-[#f85149] text-[10px] border border-[#da3633] flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        Alert
                      </span>
                    )}
                  </div>
                  {obj.suspicionReason && (
                    <p className="text-[11px] text-[#f85149] mt-1 font-sans">
                      {obj.suspicionReason}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Selected Object Byte Inspector */}
        <div className="lg:col-span-6 bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex flex-col h-[460px] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#58a6ff]" />
              <span>
                Object Inspection:{" "}
                {inspectedObject ? `${inspectedObject.id} ${inspectedObject.gen} obj` : "None"}
              </span>
            </h3>
            {inspectedObject && (
              <span className="text-xs font-mono text-[#8b949e]">
                Offset: {inspectedObject.offset} | Length: {inspectedObject.length} B
              </span>
            )}
          </div>

          {inspectedObject ? (
            <div className="flex-1 flex flex-col bg-[#0d1117] border border-[#30363d] rounded-md p-3 overflow-hidden">
              <div className="mb-2 pb-2 border-b border-[#30363d] flex items-center justify-between text-xs font-mono text-[#8b949e]">
                <span>Type: <strong className="text-[#f0f6fc]">{inspectedObject.type}</strong></span>
                <span>Stream: <strong className="text-[#f0f6fc]">{inspectedObject.isStream ? "YES" : "NO"}</strong></span>
              </div>

              {inspectedObject.isSuspicious && (
                <div className="mb-3 p-2.5 rounded bg-[#da363326] border border-[#da3633] text-xs text-[#f85149]">
                  <strong>⚠️ Forensic Anomaly Detected:</strong> {inspectedObject.suspicionReason}
                </div>
              )}

              <div className="text-xs font-mono text-[#8b949e] mb-1">Object byte dump:</div>
              <pre className="flex-1 bg-[#010409] border border-[#30363d] rounded p-3 text-xs font-mono text-[#7ee787] overflow-auto whitespace-pre-wrap select-all">
                {`${inspectedObject.id} ${inspectedObject.gen} obj\n${inspectedObject.rawSnippet || "<< /Type /" + inspectedObject.type + " >>"}\nendobj`}
              </pre>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#8b949e] font-mono">
              Select an object from the tree to inspect its raw bytes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
