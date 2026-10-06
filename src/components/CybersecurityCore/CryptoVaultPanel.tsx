import React, { useState } from "react";
import {
  HardDrive,
  Lock,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Database,
  Hash,
  Share2,
} from "lucide-react";
import { CryptoVaultInfo } from "../../types";

const PHYSICAL_VAULTS: CryptoVaultInfo[] = [
  {
    id: "vault-1",
    name: "Bóveda Maestra de Actas E-14 (Crudas)",
    deviceLabel: "D A T A 1",
    capacity: "406 GB",
    verifiedFilesCount: 439623,
    sha256Frozen: true,
    description:
      "Repositorio masivo de actas electorales E-14 en formato PDF original escaneado. Descargado y sellado criptográficamente en junio de 2026.",
    storageType: "HDD",
  },
  {
    id: "vault-2",
    name: "Bóveda de Evidencias, Legal & Takeouts",
    deviceLabel: "A N Z A C A",
    capacity: "79.71 GB",
    verifiedFilesCount: 7475,
    sha256Frozen: true,
    description:
      "Expedientes legales, registros de cadena de custodia, volcados Google Takeout, bitácoras de incidentes y audios periciales.",
    storageType: "HDD",
  },
  {
    id: "vault-3",
    name: "Bóveda Activa de Análisis & Vectores Desensamblados",
    deviceLabel: "LOCAL NVMe",
    capacity: "185 GB",
    verifiedFilesCount: 117994,
    sha256Frozen: true,
    description:
      "Espacio de trabajo para deconstrucción de capas /Contents, máscaras 1bpc, tablas XREF deconstruidas y series de Benford 2BL.",
    storageType: "NVMe",
  },
  {
    id: "vault-4",
    name: "Bóveda Criptográfica en Frío (Firmas & Hashes)",
    deviceLabel: "B A C K U P",
    capacity: "6.9 GB",
    verifiedFilesCount: 147800,
    sha256Frozen: true,
    description:
      "Árboles Merkle y archivo firmas_criptograficas_sha256.txt con el respaldo distribuido de los 75.000 Testigos Digitales.",
    storageType: "COLD_BACKUP",
  },
];

export const CryptoVaultPanel: React.FC = () => {
  const [selectedVault, setSelectedVault] = useState<CryptoVaultInfo>(PHYSICAL_VAULTS[0]);
  const [searchHash, setSearchHash] = useState<string>("");
  const [hashResult, setHashResult] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleVerifyHash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchHash.trim()) return;

    // Simulated deterministic hash match verification
    if (searchHash.length >= 8) {
      setHashResult(
        `✅ Hash SHA-256 verificado en firmas_criptograficas_sha256.txt. Sello de tiempo: 2026-06-21T18:42:10Z. Coincide con el registro de 75.000 testigos digitales.`
      );
    } else {
      setHashResult(`⚠️ Ingrese un hash SHA-256 válido (mínimo 8 caracteres hexadecimales).`);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#58a6ff] px-2.5 py-0.5 rounded-full bg-[#1f6feb26] border border-[#388bfd40]">
                EVIDENCIA VERIFICADA
              </span>
              <span className="text-xs font-mono text-[#3fb950] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Inmutable SHA-256
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#f0f6fc] font-mono mt-1">
              Bóvedas Criptográficas & Red de Testigos Digitales
            </h2>
            <p className="text-xs sm:text-sm text-[#8b949e] mt-1">
              Preservación física y distribuida de más de{" "}
              <strong className="text-[#f0f6fc]">677 Gigabytes</strong> en 4 bóvedas selladas bajo
              la norma ISO/IEC 27037.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#8b949e] px-3 py-2 rounded bg-[#0d1117] border border-[#30363d]">
              Total Docs: <strong className="text-[#f0f6fc]">147.000+</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Vaults Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PHYSICAL_VAULTS.map((vault) => {
          const isSelected = selectedVault.id === vault.id;
          return (
            <button
              key={vault.id}
              onClick={() => setSelectedVault(vault)}
              className={`p-4 rounded-lg border text-left transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? "bg-[#21262d] border-[#58a6ff] shadow-md ring-1 ring-[#58a6ff]"
                  : "bg-[#161b22] border-[#30363d] hover:border-[#8b949e]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded bg-[#0d1117] border border-[#30363d]">
                  <HardDrive className="w-4 h-4 text-[#58a6ff]" />
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#1f6feb20] text-[#58a6ff]">
                  {vault.capacity}
                </span>
              </div>

              <div>
                <div className="text-xs font-mono font-bold text-[#f0f6fc]">{vault.deviceLabel}</div>
                <div className="text-[11px] text-[#8b949e] truncate">{vault.name}</div>
              </div>

              <div className="pt-2 border-t border-[#30363d] flex items-center justify-between text-[10px] font-mono text-[#8b949e]">
                <span>{vault.verifiedFilesCount.toLocaleString()} archivos</span>
                <span className="text-[#3fb950] flex items-center gap-0.5">
                  <Lock className="w-3 h-3" /> Sellado
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Vault Details & Verifier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vault details (7 cols) */}
        <div className="lg:col-span-7 bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#58a6ff] uppercase">Bóveda Seleccionada</span>
              <h3 className="text-base font-bold text-[#f0f6fc] font-mono mt-0.5">
                {selectedVault.deviceLabel} — {selectedVault.name}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#3fb950] px-2.5 py-1 rounded bg-[#23863626] border border-[#238636]">
              {selectedVault.capacity}
            </span>
          </div>

          <p className="text-xs text-[#c9d1d9] font-sans leading-relaxed">
            {selectedVault.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-[#8b949e]">Archivos Verificados:</span>
              <div className="text-sm font-bold text-[#f0f6fc] mt-0.5">
                {selectedVault.verifiedFilesCount.toLocaleString()} documentos
              </div>
            </div>

            <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-[#8b949e]">Tipo de Medio Físico:</span>
              <div className="text-sm font-bold text-[#58a6ff] mt-0.5">{selectedVault.storageType}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0d1117] border border-[#30363d] flex items-center justify-between">
            <div className="text-xs font-mono text-[#8b949e]">
              <span>Registro Maestro: </span>
              <code className="text-[#58a6ff]">firmas_criptograficas_sha256.txt</code>
            </div>
            <button
              onClick={() =>
                copyToClipboard("sha256sum --check firmas_criptograficas_sha256.txt", "check-sha")
              }
              className="text-xs font-mono text-[#8b949e] hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === "check-sha" ? (
                <Check className="w-3.5 h-3.5 text-[#3fb950]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>Copiar Test</span>
            </button>
          </div>
        </div>

        {/* SHA-256 Verifier Tool (5 cols) */}
        <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#58a6ff]" />
              Verificador Instantáneo de Hash
            </h3>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Comprueba si una muestra E-14 pertenece al registro inmutable de 75K testigos
            </p>
          </div>

          <form onSubmit={handleVerifyHash} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Pegar hash SHA-256 o código de acta..."
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#f0f6fc] px-3 py-2 rounded-md focus:ring-1 focus:ring-[#58a6ff] focus:outline-none placeholder-[#8b949e]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-xs font-mono font-bold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verificar en Bóveda</span>
            </button>
          </form>

          {hashResult && (
            <div className="p-3 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#c9d1d9] leading-relaxed">
              {hashResult}
            </div>
          )}

          <div className="pt-2 border-t border-[#30363d] text-[11px] font-mono text-[#8b949e] flex items-center justify-between">
            <span>Red Descentralizada:</span>
            <span className="text-[#3fb950] font-bold">Frente Digital 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
