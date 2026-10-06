import React, { useState } from "react";
import {
  ShieldAlert,
  Flame,
  HardDrive,
  Terminal,
  Sparkles,
  Cpu,
  Lock,
  Layers,
  Radio,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";
import { ForensicReport } from "../../types";
import { DfirCommandCenter } from "./DfirCommandCenter";
import { RootkitProtocolPanel } from "./RootkitProtocolPanel";
import { CryptoVaultPanel } from "./CryptoVaultPanel";
import { TerminalCliTab } from "../TerminalCliTab";
import { AiOracleTab } from "../AiOracleTab";

type CyberSubTab =
  | "DFIR_COMMAND"
  | "ROOTKIT_PROTOCOL"
  | "CRYPTO_VAULTS"
  | "CLI_TERMINAL"
  | "THREAT_ORACLE"
  | "DEVIL_TOOLS";

interface CybersecurityCoreViewProps {
  report: ForensicReport;
  onOpenRecoveryModal: () => void;
  onOpenToolsModal: () => void;
}

export const CybersecurityCoreView: React.FC<CybersecurityCoreViewProps> = ({
  report,
  onOpenRecoveryModal,
  onOpenToolsModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<CyberSubTab>("DFIR_COMMAND");
  const [isOfflineDevilActive, setIsOfflineDevilActive] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      {/* Sub-navigation bar for Cybersecurity Core */}
      <div className="border border-[#da363340] bg-[#161b22] rounded-lg p-1.5 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveSubTab("DFIR_COMMAND")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "DFIR_COMMAND"
                ? "bg-[#da363326] text-[#f85149] border border-[#da3633] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#f85149]" />
            <span>1. Centro DFIR & Asedio</span>
          </button>

          <button
            onClick={() => setActiveSubTab("ROOTKIT_PROTOCOL")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "ROOTKIT_PROTOCOL"
                ? "bg-[#da363326] text-[#f85149] border border-[#da3633] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#f85149] animate-pulse" />
            <span>2. Protocolo Rootkit / Bootkit</span>
          </button>

          <button
            onClick={() => setActiveSubTab("CRYPTO_VAULTS")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "CRYPTO_VAULTS"
                ? "bg-[#da363326] text-[#f85149] border border-[#da3633] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
            }`}
          >
            <HardDrive className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>3. Bóvedas 677 GB & Testigos</span>
          </button>

          <button
            onClick={() => setActiveSubTab("CLI_TERMINAL")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "CLI_TERMINAL"
                ? "bg-[#da363326] text-[#f85149] border border-[#da3633] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-[#3fb950]" />
            <span>4. Terminal babayaga_core.py</span>
          </button>

          <button
            onClick={() => setActiveSubTab("THREAT_ORACLE")}
            className={`px-3.5 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === "THREAT_ORACLE"
                ? "bg-[#da363326] text-[#f85149] border border-[#da3633] shadow-sm font-semibold"
                : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#bc8cff]" />
            <span>5. Oráculo IA de Amenazas</span>
          </button>
        </div>

        {/* Devil Mode Badge & Toggle */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs font-mono">
          <button
            onClick={() => setIsOfflineDevilActive(!isOfflineDevilActive)}
            className="flex items-center gap-1.5 cursor-pointer text-[#8b949e] hover:text-[#f0f6fc]"
            title="Devil Methods: 100% pure Python fallback without external dependencies"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOfflineDevilActive ? "bg-[#3fb950]" : "bg-[#8b949e]"
              }`}
            />
            <span className="text-[11px]">
              Modo Devil (Offline):{" "}
              <strong className={isOfflineDevilActive ? "text-[#3fb950]" : "text-[#8b949e]"}>
                {isOfflineDevilActive ? "ACTIVO" : "INACTIVO"}
              </strong>
            </span>
          </button>
        </div>
      </div>

      {/* View router for Cybersecurity core */}
      <div>
        {activeSubTab === "DFIR_COMMAND" && (
          <DfirCommandCenter
            onOpenRecovery={() => setActiveSubTab("ROOTKIT_PROTOCOL")}
            onOpenVaults={() => setActiveSubTab("CRYPTO_VAULTS")}
            onOpenTerminal={() => setActiveSubTab("CLI_TERMINAL")}
          />
        )}

        {activeSubTab === "ROOTKIT_PROTOCOL" && <RootkitProtocolPanel />}

        {activeSubTab === "CRYPTO_VAULTS" && <CryptoVaultPanel />}

        {activeSubTab === "CLI_TERMINAL" && <TerminalCliTab report={report} />}

        {activeSubTab === "THREAT_ORACLE" && <AiOracleTab report={report} />}
      </div>
    </div>
  );
};
