import React, { useState } from "react";
import {
  Flame,
  ShieldAlert,
  Smartphone,
  Laptop,
  Terminal,
  Copy,
  Check,
  AlertTriangle,
  FileCheck2,
  RefreshCw,
  Cpu,
  Layers,
} from "lucide-react";

export const RootkitProtocolPanel: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<"SAMSUNG" | "XIAOMI" | "PIXEL" | "PC">("SAMSUNG");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#161b22] border border-[#f85149]/40 rounded-lg p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#da363326] border border-[#da3633] flex items-center justify-center">
              <Flame className="w-5 h-5 text-[#f85149] animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#f0f6fc] font-mono flex items-center gap-2">
                Protocolo de Descontaminación de Nivel 0 (Rootkit / Bootkit)
              </h2>
              <p className="text-xs text-[#8b949e]">
                Procedimiento Pericial DFIR para erradicación de intrusiones en Kernel, /system, /vendor y EEPROM
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#da363326] text-[#f85149] border border-[#da3633]">
            CRITICAL DFIR OPS
          </span>
        </div>

        {/* Warning Principle Box */}
        <div className="p-3.5 rounded-lg bg-[#da363315] border border-[#f85149]/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#f85149] shrink-0 mt-0.5" />
          <div className="text-xs text-[#c9d1d9] leading-relaxed">
            <strong className="text-[#f85149]">PRINCIPIO FUNDAMENTAL FORENSE:</strong> Un
            restablecimiento de fábrica convencional solo limpia <code>/data</code> y{" "}
            <code>/cache</code>. El malware en Rootkits/Bootkits reside en las particiones de sistema
            protegidas contra escritura.{" "}
            <span className="underline font-bold text-white">
              La única vía segura es el Reflasheo Total de Particiones Físicas (Stock ROM oficial).
            </span>
          </div>
        </div>
      </div>

      {/* Device Selector Tabs */}
      <div className="border border-[#30363d] bg-[#161b22] rounded-lg p-1.5 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveDevice("SAMSUNG")}
          className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
            activeDevice === "SAMSUNG"
              ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
              : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>1. Samsung (Odin / Heimdall)</span>
        </button>

        <button
          onClick={() => setActiveDevice("XIAOMI")}
          className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
            activeDevice === "XIAOMI"
              ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
              : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>2. Xiaomi / Redmi (Fastboot)</span>
        </button>

        <button
          onClick={() => setActiveDevice("PIXEL")}
          className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
            activeDevice === "PIXEL"
              ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
              : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>3. Google Pixel (WebUSB)</span>
        </button>

        <button
          onClick={() => setActiveDevice("PC")}
          className={`px-4 py-2 rounded-md text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer ${
            activeDevice === "PC"
              ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] shadow-sm font-semibold"
              : "text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d]/60"
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>4. PC / Laptop (UEFI EEPROM)</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 sm:p-6 space-y-6">
        {activeDevice === "SAMSUNG" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#f0f6fc] font-mono flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#58a6ff]" />
                  Descontaminación Samsung: Odin v3.14+ / Heimdall Linux
                </h3>
                <p className="text-xs text-[#8b949e]">
                  Descarga directa de binarios criptográficamente firmados por Samsung sin intermediarios
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f6feb26] text-[#58a6ff] border border-[#388bfd40]">
                PIT + Binary Flash
              </span>
            </div>

            {/* Step 1: samloader */}
            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#58a6ff]">
                  Paso 1: Descarga Oficial con Samloader / Bifrost
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "pip install samloader\nsamloader -m SM-MODELO -r CSC download -O .\nsamloader -m SM-MODELO -r CSC decrypt -v VERSION -i ARCHIVO.enc4 -o firmware.zip",
                      "samloader"
                    )
                  }
                  className="text-xs text-[#8b949e] hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                >
                  {copiedKey === "samloader" ? (
                    <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copiar</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-[#c9d1d9] bg-[#161b22] p-3 rounded border border-[#30363d] overflow-x-auto">
{`pip install samloader
samloader -m SM-G998B -r COO download -O .
samloader -m SM-G998B -r COO decrypt -v G998BXXU9E... -i ARCHIVO.enc4 -o firmware.zip`}
              </pre>
            </div>

            {/* Step 2: Odin Slots */}
            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3">
              <span className="text-xs font-mono font-bold text-[#e3b341]">
                Paso 2: Asignación Estricta de Ranuras en Odin (¡REGLA CSC!)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#161b22] border border-[#30363d]">
                  <strong className="text-[#58a6ff]">BL:</strong> Carga <code>BL_...</code> (Bootloader)
                </div>
                <div className="p-2.5 rounded bg-[#161b22] border border-[#30363d]">
                  <strong className="text-[#58a6ff]">AP:</strong> Carga <code>AP_...</code> (Kernel, Recovery, System)
                </div>
                <div className="p-2.5 rounded bg-[#161b22] border border-[#30363d]">
                  <strong className="text-[#58a6ff]">CP:</strong> Carga <code>CP_...</code> (Módem y Radio)
                </div>
                <div className="p-2.5 rounded bg-[#da363315] border border-[#f85149]/40">
                  <strong className="text-[#f85149]">CSC:</strong> Carga <code>CSC_...</code>{" "}
                  <span className="text-[#f85149] font-bold">(NUNCA HOME_CSC)</span>
                </div>
              </div>
              <p className="text-[11px] text-[#8b949e]">
                ⚠️ <strong>Nota Pericial:</strong> Usar <code>CSC_</code> regular reformatea la tabla
                física de particiones (PIT), eliminando la persistencia de cualquier rootkit.
              </p>
            </div>

            {/* Step 3: Heimdall */}
            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#3fb950]">
                  Comando Alternativo en Linux Nativo (Heimdall):
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "sudo heimdall flash --resume --PIT s1.pit --BOOTLOADER sboot.bin --PARAM param.bin --BOOT boot.img --RECOVERY recovery.img --SYSTEM system.img --USERDATA userdata.img --CACHE cache.img --RADIO modem.bin",
                      "heimdall"
                    )
                  }
                  className="text-xs text-[#8b949e] hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                >
                  {copiedKey === "heimdall" ? (
                    <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copiar</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-[#c9d1d9] bg-[#161b22] p-3 rounded border border-[#30363d] overflow-x-auto">
{`sudo heimdall flash --resume --PIT s1.pit \\
  --BOOTLOADER sboot.bin --PARAM param.bin --BOOT boot.img \\
  --RECOVERY recovery.img --SYSTEM system.img --USERDATA userdata.img \\
  --CACHE cache.img --RADIO modem.bin`}
              </pre>
            </div>
          </div>
        )}

        {activeDevice === "XIAOMI" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#f0f6fc] font-mono flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#58a6ff]" />
                  Descontaminación Xiaomi / Redmi / POCO: Fastboot Mode
                </h3>
                <p className="text-xs text-[#8b949e]">
                  Flasheo con archivo oficial .tgz (Fastboot ROM)
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1f6feb26] text-[#58a6ff] border border-[#388bfd40]">
                flash_all.sh
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3">
              <span className="text-xs font-mono font-bold text-[#58a6ff]">
                Ejecución del Script de Limpieza Radical
              </span>
              <pre className="text-xs font-mono text-[#c9d1d9] bg-[#161b22] p-3 rounded border border-[#30363d] overflow-x-auto">
{`# 1. Apagar y entrar en Fastboot: Mantener Bajar Volumen + Encendido
# 2. Descomprimir archivo .tgz con 7-Zip
# 3. En Linux:
chmod +x flash_all.sh
./flash_all.sh

# 4. En Windows: Ejecutar con doble clic flash_all.bat`}
              </pre>
              <div className="p-3 rounded bg-[#da363315] border border-[#f85149]/40 text-xs text-[#f85149] font-mono">
                ⚠️ NUNCA ejecutes <code>flash_all_except_storage.bat</code> si hay sospecha de
                infección en particiones de arranque.
              </div>
            </div>
          </div>
        )}

        {activeDevice === "PIXEL" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#f0f6fc] font-mono flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#58a6ff]" />
                  Descontaminación Google Pixel: WebUSB Oficial
                </h3>
                <p className="text-xs text-[#8b949e]">
                  Android Flash Tool con verificación criptográfica completa
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#23863626] text-[#3fb950] border border-[#238636]">
                Android Verified Boot
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3">
              <span className="text-xs font-mono text-[#c9d1d9]">
                Accede a la herramienta oficial desde navegador Chrome / Brave:
              </span>
              <div className="p-3 rounded bg-[#161b22] border border-[#30363d] font-mono text-xs text-[#58a6ff]">
                https://flash.android.com
              </div>
              <div className="space-y-2 text-xs font-mono text-[#c9d1d9]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3fb950]" />
                  <span>✅ <strong>Wipe Device</strong> (Formateo completo)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3fb950]" />
                  <span>✅ <strong>Force Flash all Partitions</strong> (Sobrescribe slots A y B)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#3fb950]" />
                  <span>✅ <strong>Lock Bootloader</strong> (Restaura la cadena de confianza)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDevice === "PC" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#f0f6fc] font-mono flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-[#58a6ff]" />
                  Descontaminación PC / Laptop: UEFI Bootkit / EEPROM
                </h3>
                <p className="text-xs text-[#8b949e]">
                  Reflasheo en frío de firmware BIOS + Destrucción de sector de arranque con dd
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#da363326] text-[#f85149] border border-[#da3633]">
                Zero-Fill MBR/GPT
              </span>
            </div>

            {/* Zero Fill Command */}
            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#f85149]">
                  1. Sobrescritura Cero del Sector de Arranque (Live USB Linux):
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      "sudo dd if=/dev/zero of=/dev/nvme0n1 bs=1M count=100 && sync",
                      "dd-command"
                    )
                  }
                  className="text-xs text-[#8b949e] hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                >
                  {copiedKey === "dd-command" ? (
                    <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copiar</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-[#c9d1d9] bg-[#161b22] p-3 rounded border border-[#30363d] overflow-x-auto">
{`# Destruye tablas de partición y sectores iniciales donde se oculta el bootkit
sudo dd if=/dev/zero of=/dev/nvme0n1 bs=1M count=100 && sync`}
              </pre>
            </div>

            <div className="p-4 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-2 text-xs text-[#c9d1d9] font-sans">
              <strong className="text-[#58a6ff] font-mono">
                2. Reflasheo de Firmware UEFI en Frío (BIOS FlashBack):
              </strong>
              <p>
                Descarga la BIOS oficial en una máquina limpia. Graba en una memoria USB FAT32 y
                utiliza el botón físico <strong>BIOS FlashBack</strong> o el actualizador UEFI
                interno para sobrescribir directamente el chip EEPROM físico.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
