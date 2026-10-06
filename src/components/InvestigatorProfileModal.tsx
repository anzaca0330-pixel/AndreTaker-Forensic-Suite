import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  Award,
  Key,
  Upload,
  RotateCcw,
  Check,
  ExternalLink,
  Cpu,
  Lock,
  Terminal,
  MapPin,
  Calendar,
} from "lucide-react";
import { InvestigatorAvatar, ANDREA_DEFAULT_AVATAR_SVG } from "./InvestigatorAvatar";

interface InvestigatorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvestigatorProfileModal: React.FC<InvestigatorProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [avatarSuccess, setAvatarSuccess] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const PGP_FINGERPRINT =
    "DF18:2026:E14F:BABA:YAGA:994F:75K0:C4CA:2026:2BL0";

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        if (result) {
          localStorage.setItem("andretaker_investigator_avatar", result);
          setAvatarSuccess("Profile picture updated successfully");
          setTimeout(() => {
            setAvatarSuccess(null);
            window.location.reload();
          }, 800);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetAvatar = () => {
    localStorage.removeItem("andretaker_investigator_avatar");
    setAvatarSuccess("Restored original illustration");
    setTimeout(() => {
      setAvatarSuccess(null);
      window.location.reload();
    }, 600);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(PGP_FINGERPRINT);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#21262d] border border-[#388bfd66] flex items-center justify-center text-[#58a6ff]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold font-mono text-[#f0f6fc]">
                  PRINCIPAL INVESTIGATOR PROFILE
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23863626] border border-[#238636] text-[#3fb950]">
                  Custodia Criptográfica
                </span>
              </div>
              <p className="text-xs text-[#8b949e] font-sans">
                Andrea Zabala Cárcamo (AnZaCa / AndreTaker) • BabaYaga Core
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
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Hero Profile Card */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="flex flex-col items-center gap-2.5">
              <InvestigatorAvatar size="xl" showBadge={true} />
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[11px] font-mono text-[#58a6ff] flex items-center gap-1 cursor-pointer transition-colors"
                  title="Upload babayaga_image.png or a custom portrait"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload photo</span>
                </button>
                <button
                  onClick={handleResetAvatar}
                  className="p-1 rounded bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] cursor-pointer"
                  title="Reset original avatar"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {avatarSuccess && (
                <span className="text-[10px] font-mono text-[#3fb950] animate-pulse">
                  {avatarSuccess}
                </span>
              )}
            </div>

            <div className="space-y-2 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-base font-bold font-mono text-[#f0f6fc]">
                  Andrea Zabala Cárcamo
                </h4>
                <span className="text-xs font-mono text-[#58a6ff] bg-[#1f6feb26] border border-[#388bfd40] px-2 py-0.5 rounded">
                  AndreTaker / AnZaCa
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs font-mono text-[#8b949e]">
                <span className="flex items-center gap-1 text-[#c9d1d9]">
                  <Award className="w-3.5 h-3.5 text-[#58a6ff]" />
                  Senior DFIR & Reverse Engineering
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#3fb950]" />
                  Canada (Political Asylum 2026)
                </span>
              </div>

              <p className="text-xs text-[#8b949e] font-sans leading-relaxed pt-1">
                Principal investigator who reverse-engineered the binary architecture of 2026 electoral E-14 PDFs,
                isolated 1-bit grayscale masks (`1bpc` / `DeviceGray`), identified the structural XREF scar using <code className="text-[#58a6ff]">qpdf</code>, and
                mathematically proved systematic fraud via Benford 2BL (Mebane) across more than 147,000 preserved forms.
              </p>
            </div>
          </div>

          {/* Operational Metrics & Digital Witness Network */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#0d1117] border border-[#30363d] p-3.5 rounded-lg">
              <div className="text-[11px] font-mono text-[#8b949e]">Custody Network</div>
              <div className="text-base font-bold font-mono text-[#3fb950] mt-0.5">
                75,000 Witnesses
              </div>
              <div className="text-[10px] text-[#8b949e] font-sans">Red Descentralizada</div>
            </div>

            <div className="bg-[#0d1117] border border-[#30363d] p-3.5 rounded-lg">
              <div className="text-[11px] font-mono text-[#8b949e]">E-14 Documents</div>
              <div className="text-base font-bold font-mono text-[#58a6ff] mt-0.5">
                &gt; 147,000 Forms
              </div>
              <div className="text-[10px] text-[#8b949e] font-sans">Sealed with SHA-256</div>
            </div>

            <div className="bg-[#0d1117] border border-[#30363d] p-3.5 rounded-lg">
              <div className="text-[11px] font-mono text-[#8b949e]">Preserved Evidence</div>
              <div className="text-base font-bold font-mono text-[#f0f6fc] mt-0.5">
                136 GB / 405 GB
              </div>
              <div className="text-[10px] text-[#8b949e] font-sans">Untampered raw data</div>
            </div>
          </div>

          {/* Cryptographic Key & Verification Fingerprint */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
              <span className="flex items-center gap-1.5 text-[#f0f6fc]">
                <Key className="w-3.5 h-3.5 text-[#58a6ff]" />
                Forensic Cryptographic Fingerprint (SHA-256 / PGP):
              </span>
              <button
                onClick={handleCopyKey}
                className="text-[11px] font-mono text-[#58a6ff] hover:text-[#79c0ff] flex items-center gap-1 cursor-pointer"
              >
                {copiedKey ? (
                  <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                ) : (
                  <span>Copy</span>
                )}
              </button>
            </div>
            <pre className="bg-[#161b22] p-2.5 rounded border border-[#30363d] text-xs font-mono text-[#7ee787] overflow-x-auto select-all">
              {PGP_FINGERPRINT}
            </pre>
          </div>

          {/* BabaYaga Origin Note */}
          <div className="bg-[#1f6feb15] border border-[#388bfd66] rounded-lg p-4 text-xs font-sans text-[#c9d1d9] space-y-1.5">
            <div className="font-bold font-mono text-[#58a6ff] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>BabaYaga Core Inception (March 18, 2026)</span>
            </div>
            <p className="leading-relaxed">
              "The one who sees in the dark, dwells in the fringes, and unearths hidden truth buried beneath digital ground.
              No synthetic vector withstands strict binary reconstruction of its constituent objects."
            </p>
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
