import React, { useState } from "react";
import {
  Image,
  QrCode,
  Layers,
  AlertTriangle,
  CheckCircle,
  Eye,
  Sliders,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { ImageAnalysisResult, ExtractedImage } from "../types";

interface ImageArtifactsTabProps {
  imagenes: ImageAnalysisResult;
}

export const ImageArtifactsTab: React.FC<ImageArtifactsTabProps> = ({
  imagenes,
}) => {
  const [selectedImage, setSelectedImage] = useState<ExtractedImage | null>(
    imagenes.imagenes[0] || null
  );
  const [filterMode, setFilterMode] = useState<"NORMAL" | "ELA" | "HEATMAP" | "INVERTED">("ELA");
  const [elaSensitivity, setElaSensitivity] = useState<number>(75);

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      <div className={`border rounded-lg p-4 flex items-center justify-between gap-4 shadow-sm ${
        imagenes.suspiciousImagesCount > 0
          ? "bg-[#da363315] border-[#f85149]/50 text-[#f0f6fc]"
          : "bg-[#161b22] border-[#30363d] text-[#f0f6fc]"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-lg shrink-0 ${
            imagenes.suspiciousImagesCount > 0
              ? "bg-[#da363326] text-[#f85149] border border-[#da3633]"
              : "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66]"
          }`}>
            <Image className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono text-[#f0f6fc]">
              {imagenes.totalImages} Extracted Images (pdfimages & identify)
            </h4>
            <p className="text-xs text-[#8b949e] font-sans">
              {imagenes.suspiciousImagesCount > 0
                ? `⚠️ Identified ${imagenes.suspiciousImagesCount} images with compression anomalies or suspicious ELA signatures (1-bit Blind Masking).`
                : "✅ All raster bitmap layers exhibit color space and quantization coherence."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d] text-[#f0f6fc]">
            QR/Barcodes: {imagenes.detectedBarcodes.length}
          </span>
        </div>
      </div>

      {/* Main Image Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Extracted images list */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#58a6ff]" />
            <span>Embedded Image Layers ({imagenes.imagenes.length})</span>
          </h3>

          <div className="space-y-2">
            {imagenes.imagenes.length === 0 ? (
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-8 text-center text-xs text-[#8b949e] font-mono">
                No embedded raster image streams detected in this file.
              </div>
            ) : (
              imagenes.imagenes.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    selectedImage?.id === img.id
                      ? "bg-[#21262d] border-[#58a6ff] text-[#58a6ff] shadow-sm"
                      : img.isSuspicious
                      ? "bg-[#da363315] border-[#f85149]/40 hover:border-[#f85149] text-[#f0f6fc]"
                      : "bg-[#161b22] border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#f0f6fc] truncate max-w-[200px]">
                      {img.name}
                    </span>
                    {img.isSuspicious ? (
                      <span className="px-2 py-0.5 rounded bg-[#da363326] text-[#f85149] text-[10px] font-mono border border-[#da3633]">
                        ELA: {img.elaScore}%
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-[#23863626] text-[#3fb950] text-[10px] font-mono border border-[#238636]">
                        Clean
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] font-mono text-[#8b949e]">
                    <div>
                      <span>Dimensions: </span>
                      <strong className="text-[#f0f6fc]">{img.width}x{img.height} px</strong>
                    </div>
                    <div>
                      <span>Color Space: </span>
                      <strong className="text-[#58a6ff]">{img.colorspace}</strong>
                    </div>
                    <div className="col-span-2 truncate">
                      <span>Compression: </span>
                      <strong className="text-[#f0f6fc]">{img.compression}</strong>
                    </div>
                  </div>

                  {img.suspicionReason && (
                    <div className="mt-2 text-[11px] text-[#f85149] bg-[#da363326] p-1.5 rounded border border-[#da3633]/60 font-sans">
                      ⚠️ {img.suspicionReason}
                    </div>
                  )}

                  {img.decodedQrOrBarcode && (
                    <div className="mt-2 text-[11px] text-[#e3b341] bg-[#d2992226] p-1.5 rounded border border-[#d29922]/60 font-mono truncate">
                      <QrCode className="w-3 h-3 inline mr-1" />
                      {img.decodedQrOrBarcode}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Error Level Analysis (ELA) Visual Lens */}
        <div className="lg:col-span-7 bg-[#161b22] border border-[#30363d] rounded-lg p-5 flex flex-col shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#58a6ff]" />
                <span>Forensic ELA Lens (Error Level Analysis)</span>
              </h3>
              <p className="text-xs text-[#8b949e] mt-0.5 font-sans">
                Detects JPEG compression rate inconsistencies indicative of superimposed stamps, signatures, or masking layers.
              </p>
            </div>

            {/* Filter Toggle Mode */}
            <div className="flex items-center gap-1 bg-[#0d1117] p-1 rounded-md border border-[#30363d] text-[11px] font-mono">
              {(["NORMAL", "ELA", "HEATMAP", "INVERTED"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    filterMode === mode
                      ? "bg-[#21262d] text-[#58a6ff] font-bold border border-[#388bfd66]"
                      : "text-[#8b949e] hover:text-[#f0f6fc]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Sensitivity Slider */}
          {filterMode !== "NORMAL" && (
            <div className="flex items-center gap-3 bg-[#0d1117] p-2.5 rounded-md border border-[#30363d] mb-4 text-xs font-mono text-[#8b949e]">
              <Sliders className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>ELA Sensitivity:</span>
              <input
                type="range"
                min="10"
                max="100"
                value={elaSensitivity}
                onChange={(e) => setElaSensitivity(parseInt(e.target.value, 10))}
                className="flex-1 accent-[#58a6ff] cursor-pointer"
              />
              <span className="text-[#58a6ff] font-bold w-9 text-right">{elaSensitivity}%</span>
            </div>
          )}

          {/* Canvas Display Simulator */}
          <div className="flex-1 min-h-[300px] bg-[#0d1117] border border-[#30363d] rounded-lg relative overflow-hidden flex items-center justify-center p-4">
            {selectedImage ? (
              <div className="relative max-w-full max-h-[340px] flex flex-col items-center justify-center">
                {/* Simulated forensic canvas box representing the extracted image */}
                <div
                  className={`w-72 sm:w-96 h-56 rounded-md border flex flex-col items-center justify-center p-4 relative overflow-hidden transition-all duration-300 ${
                    filterMode === "ELA"
                      ? selectedImage.isSuspicious
                        ? "bg-gradient-to-br from-[#490202] via-[#161b22] to-[#da363326] border-[#f85149] shadow-md shadow-[#da363333]"
                        : "bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#0d1117] border-[#30363d]"
                      : filterMode === "HEATMAP"
                      ? "bg-gradient-to-br from-[#1f6feb26] via-[#d2992226] to-[#da363326] border-[#d29922]"
                      : filterMode === "INVERTED"
                      ? "bg-[#f0f6fc] text-[#0d1117] border-[#30363d] invert"
                      : "bg-[#161b22] border-[#30363d] text-[#f0f6fc]"
                  }`}
                >
                  {/* Decorative forensic grid */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Stamp / Altered Area Highlight simulation */}
                  {selectedImage.isSuspicious && filterMode !== "NORMAL" && (
                    <div
                      className="absolute w-36 h-20 border-2 border-dashed border-[#f85149] rounded bg-[#da363333] backdrop-blur-xs flex items-center justify-center text-center p-2 animate-pulse"
                      style={{ opacity: elaSensitivity / 100 }}
                    >
                      <span className="text-[10px] font-mono font-bold text-[#f85149]">
                        ⚠️ ELA ARTIFACT DETECTED
                      </span>
                    </div>
                  )}

                  <div className="z-10 text-center space-y-1">
                    <div className="text-xs font-mono font-bold text-[#f0f6fc]">
                      {selectedImage.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#8b949e]">
                      {selectedImage.width} x {selectedImage.height} px | {selectedImage.colorspace}
                    </div>
                    <div className="text-[10px] font-mono text-[#58a6ff]">
                      Active Filter: {filterMode} ({elaSensitivity}% Gain)
                    </div>
                  </div>
                </div>

                {/* Footer telemetry */}
                <div className="mt-3 text-center text-xs font-mono text-[#8b949e]">
                  <span>Mean Brightness: {selectedImage.meanBrightness.toFixed(1)}</span>
                  <span className="mx-2">•</span>
                  <span>Compression: {selectedImage.compression}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs font-mono text-[#8b949e]">
                Select an image to initiate ELA scrutiny.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
