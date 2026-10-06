import React, { useState } from "react";
import {
  X,
  FileText,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Layers,
  Sparkles,
  Award,
} from "lucide-react";
import { InvestigatorAvatar } from "./InvestigatorAvatar";

interface ToolkitManifestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ToolkitManifestModal: React.FC<ToolkitManifestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const MANIFEST_MARKDOWN = `# AndreTaker — BabaYaga Core Forensic Toolkit
**Master Architecture Specification, Expert Guidelines, and Chain of Custody Manifest**

---

| Forensic Metadata | Registry Specification |
| :--- | :--- |
| **Toolkit Identifier** | \`AndreTaker — BabaYaga Core Forensic Suite\` |
| **Version** | \`1.0.0 (Digital Preservation Release)\` |
| **Principal Investigator** | **Andrea Zabala Cárcamo (AnZaCa / AndreTaker)** |
| **Forensic Specialty** | Digital Forensics and Incident Response (DFIR) & Reverse Engineering |
| **Cryptographic Custody Network** | Red Descentralizada de Testigos Digitales (75,000) |
| **Preserved Evidence Volume** | >147,000 E-14 documents (136 GB core / >400 GB general repository) |
| **Code & Evidence License** | Apache 2.0 / Open Forensic Science |
| **Standards Applied** | ISO/IEC 27037 (Digital Evidence Management), NIST SP 800-86 |
| **Inspiration / Inception** | *The dream of March 18, 2026 (BabaYaga: the one who sees in the shadows, unearths hidden truth, and dismantles synthetic vectors)* |

---

## 1. 📌 Purpose and Ecosystem Definition

**AndreTaker — BabaYaga Core** is a forensic-grade multi-layered ecosystem developed for automated analysis, binary disassembly, statistical scrutiny, and tampering detection in mass electoral PDF form streams (E-14 tally sheets).

The toolkit combines low-level PDF stream parsing with advanced statistical distribution models and forensic computer vision to expose manipulation vectors undetectable during superficial visual inspection.

### Detected Forensic Vectors:
1. **1-Bit Blind Masking & Flattening**: Synthetic raster layer injection (\`/Contents\`) and monochromatic 1-bit per channel masks (\`1bpc\` / \`DeviceGray\`) superimposed over original scans to alter handwritten figures while preserving exterior column totals.
2. **Structural XREF Scar**: Corrupted cross-reference tables detected via strict \`qpdf\` reconstruction (15 declared catalogue objects vs. 13 objects present in the original binary stream).
3. **Quantum ELA Anomalies**: JPEG quantization rate mismatches (Error Level Analysis) between background form paper and superimposed stamps or signatures.
4. **Benford's Law Deviation (2BL - Walter Mebane)**: Statistically impossible second-digit distribution collapses in election returns (p < 0.0001), indicating synthetic numerical generation with zero natural variance.

---

## 2. 🧠 Modular Architecture (\`04_HERRAMIENTAS / 02_ANALISIS\`)

The ecosystem operates through a modular suite orchestrated by the central \`babayaga_core.py\` engine:

\`\`\`
AndreTaker-BabaYaga-Core/
├── babayaga_core.py                 # Primary orchestrator and forensic pipeline
├── 04_HERRAMIENTAS/
│   ├── detector_blind_masking.py    # 1bpc, DeviceGray, and /Contents stream inspector
│   ├── analisis_xref.py             # qpdf structural parser, XREF 15 vs 13 validator
│   ├── detector_1bit_flattening.py  # Forced compression, quantization, and ELA analysis
│   ├── analisis_benford.py          # Benford 2BL (Mebane), chi-square, and variance engine
│   └── generador_informes.py        # Procedural affidavit generator in Markdown, JSON, and PDF
└── firmas_criptograficas_sha256.txt # Immutable SHA-256 hash registry for all forms
\`\`\`

### Module Responsibility Matrix:

| Module | Forensic Function | Native Binaries & Libraries |
| :--- | :--- | :--- |
| \`analisis_xref.py\` | Detects structural XREF scars and orphan/injected objects. | \`qpdf --check\`, \`pdfdetach\` |
| \`detector_blind_masking.py\` | Extracts and isolates \`1bpc\` mask layers and vector content streams. | \`poppler-utils\`, \`pdfimages -list\` |
| \`detector_1bit_flattening.py\` | Performs Error Level Analysis (ELA) and detects non-homogeneous quantization loss. | \`imagemagick (identify)\`, OpenCV |
| \`analisis_benford.py\` | Computes 2nd-digit Benford test (Mebane 2BL) and randomness validation. | \`scipy.stats\`, \`numpy\` |
| \`generador_informes.py\` | Produces consolidated verdicts in 3 target formats. | Jinja2, Pandoc |

---

## 3. 🎯 Audience Routing Matrix (Triple Output Directive)

To ensure maximum judicial, technical, and civic impact, all analyses conducted by **AndreTaker — BabaYaga Core** generate targeted outputs for three distinct audiences:

1. **Audience 1: Technical / Expert (DFIR & Reverse Engineering)**
   - Rigorous, mathematical, step-by-step reproducible commands, exact SHA-256 hashes, and binary memory dumps.
2. **Audience 2: Legal / Judicial (Chain of Custody & Admissible Evidence)**
   - Strict procedural structure grounded in ISO/IEC 27037 and NIST SP 800-86 digital evidence standards.
3. **Audience 3: General Citizen / Public Disclosure (Clarity & Transparency)**
   - Clear language, "before vs after" visual comparisons, and intuitive analogies.

---

## 4. 🔒 Chain of Custody & Evidence Preservation

- **Digital Witnesses**: 75,000 distributed digital observers downloaded and sealed E-14 forms with SHA-256 cryptographic hashes immediately upon initial server publication.
- **Immutable Hash Registry**: Every processed file is validated against the master cryptographic ledger in \`firmas_criptograficas_sha256.txt\`.

---
*Authored and preserved by Andrea Zabala Cárcamo (AnZaCa / AndreTaker).*  
*Red de Custodia Criptográfica — Immutable Cryptographic Evidence.*
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(MANIFEST_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([MANIFEST_MARKDOWN], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AndreTaker_BabaYaga_Core_Forensic_Toolkit.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#21262d] border border-[#388bfd66] flex items-center justify-center text-[#58a6ff]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold font-mono text-[#f0f6fc]">
                  MASTER DOCUMENT: AndreTaker_BabaYaga_Core_Forensic_Toolkit.md
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f6feb26] border border-[#388bfd40] text-[#58a6ff]">
                  Apache 2.0
                </span>
              </div>
              <p className="text-xs text-[#8b949e] font-sans">
                Architecture, Expert Modules, ISO/IEC 27037 Standards & Toolkit Inception
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
        <div className="flex-1 overflow-y-auto p-6 bg-[#0d1117] font-mono text-xs text-[#c9d1d9] space-y-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <InvestigatorAvatar size="md" showBadge={true} />
              <div className="space-y-1">
                <div className="text-xs font-bold text-[#f0f6fc] font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#58a6ff]" />
                  <span>Principal Investigator: Andrea Zabala Cárcamo (AnZaCa / AndreTaker)</span>
                </div>
                <p className="text-xs text-[#8b949e] font-sans">
                  Red Descentralizada • 75,000 Digital Witnesses • 147,000 documents preserved with SHA-256
                </p>
              </div>
            </div>
            <div className="text-[11px] font-mono px-3 py-1.5 rounded bg-[#0d1117] border border-[#30363d] text-[#8b949e] shrink-0">
              Location: <code className="text-[#58a6ff]">/04_HERRAMIENTAS/</code>
            </div>
          </div>

          <pre className="whitespace-pre-wrap leading-relaxed text-[#c9d1d9] bg-[#161b22] p-5 rounded-lg border border-[#30363d] select-all">
            {MANIFEST_MARKDOWN}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#30363d] bg-[#0d1117] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-[#8b949e]">
            File: <span className="text-[#f0f6fc] font-bold">AndreTaker_BabaYaga_Core_Forensic_Toolkit.md</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-md bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] text-[#f0f6fc] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#3fb950]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-md bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs font-mono transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] border border-[#30363d] text-xs font-mono transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
