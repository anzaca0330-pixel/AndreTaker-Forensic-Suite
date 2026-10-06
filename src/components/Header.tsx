import React from "react";
import {
  FileSearch,
  Upload,
  Terminal,
  ShieldCheck,
  Cpu,
  RefreshCw,
  FolderOpen,
  Sparkles,
  BookOpen,
  UserCheck,
  Flame,
  Layers,
  ShieldAlert,
  Zap,
  HardDrive,
  Globe,
  Check,
} from "lucide-react";
import { SampleCase, ActiveEngineCore } from "../types";
import { InvestigatorAvatar } from "./InvestigatorAvatar";
import { useLanguage } from "../context/LanguageContext";

interface HeaderProps {
  currentCase: SampleCase;
  sampleCases: SampleCase[];
  activeCore: ActiveEngineCore;
  onChangeCore: (core: ActiveEngineCore) => void;
  lightweightMode: boolean;
  onToggleLightweight: () => void;
  onSelectCase: (c: SampleCase) => void;
  onFileUpload: (file: File) => void;
  onOpenToolsModal: () => void;
  onOpenReportModal: () => void;
  onOpenManifestModal: () => void;
  onOpenProfileModal: () => void;
  onOpenRecoveryModal: () => void;
  isAnalyzing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentCase,
  sampleCases,
  activeCore,
  onChangeCore,
  lightweightMode,
  onToggleLightweight,
  onSelectCase,
  onFileUpload,
  onOpenToolsModal,
  onOpenReportModal,
  onOpenManifestModal,
  onOpenProfileModal,
  onOpenRecoveryModal,
  isAnalyzing,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = React.useState(false);
  const langMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <header className="border-b border-[#30363d] bg-[#161b22]/95 backdrop-blur-md sticky top-0 z-40">
      {/* Top Bar: Brand, Dual-Core Switcher, Language & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 border-b border-[#30363d]/60">
        {/* Brand identity & Investigator Profile Trigger */}
        <div className="flex items-center gap-3.5 w-full md:w-auto">
          <button
            onClick={onOpenProfileModal}
            className="group relative cursor-pointer focus:outline-none"
            title={language === "ES" ? "Ver perfil forense de Andrea Zabala (AndreTaker) • Red de 75.000 Testigos" : "View forensic profile of Andrea Zabala (AndreTaker) • 75K Witness Network"}
          >
            <InvestigatorAvatar size="md" showBadge={true} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#f0f6fc] flex items-center gap-2">
                ANDRETAKER
                <span className="text-[#58a6ff] text-[11px] px-2 py-0.5 rounded-full bg-[#1f6feb26] border border-[#388bfd40] font-mono font-medium">
                  BabaYaga Core v2.1
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
              <button
                onClick={onOpenProfileModal}
                className="hover:text-[#58a6ff] transition-colors cursor-pointer text-[#c9d1d9] font-medium"
              >
                Andrea Zabala (AnZaCa)
              </button>
              <span className="text-[#30363d]">•</span>
              <span className="text-[#8b949e] hidden sm:inline">{t.brandSubtitle}</span>
              <span className="text-[#30363d] hidden sm:inline">•</span>
              <span className="text-[#3fb950] text-[11px] hidden lg:inline">{t.witnessCount}</span>
            </div>
          </div>
        </div>

        {/* Master Dual-Core Switcher (Centrado y de Alta Visibilidad) */}
        <div className="flex items-center p-1 rounded-lg bg-[#0d1117] border border-[#30363d] shadow-inner">
          <button
            onClick={() => onChangeCore("ANALYSIS")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCore === "ANALYSIS"
                ? "bg-[#1f6feb26] text-[#58a6ff] border border-[#388bfd] shadow-sm"
                : "text-[#8b949e] hover:text-[#f0f6fc]"
            }`}
            title={language === "ES" ? "Activar Núcleo 1: Análisis Forense de Actas E-14 y Estructuras PDF (Baba Yaga & Tycho)" : "Activate Core 1: Forensic Analysis of E-14 Forms & PDF Structures (Baba Yaga & Tycho)"}
          >
            <Layers className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>{t.core1Title}</span>
          </button>

          <button
            onClick={() => onChangeCore("CYBERSECURITY")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCore === "CYBERSECURITY"
                ? "bg-[#da363326] text-[#f85149] border border-[#da3633] shadow-sm"
                : "text-[#8b949e] hover:text-[#f0f6fc]"
            }`}
            title={language === "ES" ? "Activar Núcleo 2: Ciberseguridad, DFIR Ops, Protocolo Rootkit y Bóvedas 677 GB (Antigravity & Shield)" : "Activate Core 2: Cybersecurity, DFIR Ops, Rootkit Protocol & 677 GB Vaults (Antigravity & Shield)"}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#f85149]" />
            <span>{t.core2Title}</span>
          </button>
        </div>

        {/* Top Controls: Language Switcher & Lightweight Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Botón de Idioma (Language Button) */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1.5 bg-[#21262d] border border-[#30363d] hover:border-[#58a6ff]/60 text-[#f0f6fc] transition-all cursor-pointer shadow-sm"
              title={language === "ES" ? "Cambiar idioma (Español / English)" : "Change language (English / Spanish)"}
              id="language-switcher-btn"
            >
              <Globe className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span className="font-bold">{language}</span>
              <span className="text-[#8b949e] text-[10px]">▼</span>
            </button>

            {/* Dropdown Menu */}
            {showLangMenu && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-md bg-[#161b22] border border-[#30363d] shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 font-mono text-xs">
                <button
                  onClick={() => {
                    setLanguage("ES");
                    setShowLangMenu(false);
                  }}
                  className={`w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-[#21262d] cursor-pointer ${
                    language === "ES" ? "text-[#58a6ff] font-bold bg-[#1f6feb15]" : "text-[#c9d1d9]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>🇨🇴</span> Español
                  </span>
                  {language === "ES" && <Check className="w-3.5 h-3.5 text-[#58a6ff]" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage("EN");
                    setShowLangMenu(false);
                  }}
                  className={`w-full px-3 py-1.5 flex items-center justify-between text-left hover:bg-[#21262d] cursor-pointer ${
                    language === "EN" ? "text-[#58a6ff] font-bold bg-[#1f6feb15]" : "text-[#c9d1d9]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>🇨🇦</span> English
                  </span>
                  {language === "EN" && <Check className="w-3.5 h-3.5 text-[#58a6ff]" />}
                </button>
              </div>
            )}
          </div>

          {/* Lightweight Mode Toggle & Status */}
          <button
            onClick={onToggleLightweight}
            className={`px-2.5 py-1 rounded-md text-xs font-mono flex items-center gap-1.5 border transition-all cursor-pointer ${
              lightweightMode
                ? "bg-[#23863626] text-[#3fb950] border-[#238636]"
                : "bg-[#21262d] text-[#8b949e] border-[#30363d] hover:text-[#f0f6fc]"
            }`}
            title={t.lightweightTooltip}
          >
            <Zap className={`w-3 h-3 ${lightweightMode ? "text-[#3fb950]" : "text-[#8b949e]"}`} />
            <span className="text-[11px]">
              {t.lightweightMode}: <strong>{lightweightMode ? t.lightweightOn : t.lightweightOff}</strong>
            </span>
          </button>
        </div>
      </div>

      {/* Sub Bar: Actions, Samples Selector & Uploads */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Core Context Description Badge */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#8b949e]">{t.activeEngine}</span>
          {activeCore === "ANALYSIS" ? (
            <span className="text-[#58a6ff] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#58a6ff] animate-pulse"></span>
              {t.core1Subtitle}
            </span>
          ) : (
            <span className="text-[#f85149] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f85149] animate-pulse"></span>
              {t.core2Subtitle}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sample Cases Dropdown */}
          <div className="relative flex items-center">
            <label className="text-xs font-mono text-[#8b949e] mr-1.5 hidden sm:inline-flex items-center gap-1">
              <FolderOpen className="w-3.5 h-3.5 text-[#58a6ff]" />
              {t.samplesLabel}
            </label>
            <select
              value={currentCase.id}
              onChange={(e) => {
                const found = sampleCases.find((c) => c.id === e.target.value);
                if (found) onSelectCase(found);
              }}
              className="bg-[#21262d] border border-[#30363d] text-[#f0f6fc] text-xs rounded-md px-2.5 py-1 focus:ring-1 focus:ring-[#58a6ff] focus:outline-none max-w-[180px] sm:max-w-xs font-mono truncate hover:border-[#8b949e] transition-colors cursor-pointer"
            >
              {sampleCases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Custom PDF Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#238636] hover:bg-[#2ea043] border border-[#2ea043]/50 text-white font-medium text-xs transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            title={language === "ES" ? "Subir acta o archivo PDF para análisis forense con AndreTaker" : "Upload E-14 form or PDF file for forensic analysis with AndreTaker"}
          >
            {isAnalyzing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <span>{isAnalyzing ? t.analyzingPdfBtn : t.analyzePdfBtn}</span>
          </button>

          {/* View Report Modal Button */}
          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] hover:text-[#f0f6fc] font-mono transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className="hidden sm:inline">{t.reportBtn}</span>
          </button>

          {/* Master Toolkit Spec Doc Modal Button */}
          <button
            onClick={onOpenManifestModal}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#f0f6fc] font-mono transition-colors cursor-pointer"
            title="Ver Documento Maestro AndreTaker_BabaYaga_Core_Forensic_Toolkit.md"
          >
            <FileSearch className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className="hidden md:inline">{t.masterDocBtn}</span>
          </button>

          {/* Emergency Rootkit Recovery Guide Button */}
          <button
            onClick={onOpenRecoveryModal}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f85149]/15 hover:bg-[#f85149]/25 border border-[#f85149]/50 text-[#f85149] hover:text-white font-mono transition-colors cursor-pointer"
            title="Protocolo de Emergencia: Recuperación de Rootkit / Bootkit"
          >
            <Flame className="w-3.5 h-3.5 text-[#f85149] animate-pulse" />
            <span className="hidden sm:inline font-bold">{t.rootkitProtocolBtn}</span>
          </button>

          {/* Environment Tools Status Check */}
          <button
            onClick={onOpenToolsModal}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] font-mono transition-colors cursor-pointer"
            title={language === "ES" ? "Verificar herramientas nativas de BabaYaga Core" : "Verify BabaYaga Core native engine tools"}
          >
            <Cpu className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
