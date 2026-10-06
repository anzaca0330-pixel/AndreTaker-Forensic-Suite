import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Flame,
  Terminal,
  Cpu,
  RefreshCw,
  Copy,
  Check,
  X,
  HardDrive,
  Download,
  Zap,
  Lock,
  FileCode2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface RootkitRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeviceCategory = "SAMSUNG_ODIN" | "XIAOMI_FASTBOOT" | "PIXEL_FASTBOOT" | "GENERIC_PC_USB";

export const RootkitRecoveryModal: React.FC<RootkitRecoveryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory>("SAMSUNG_ODIN");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#161b22] border border-[#f85149]/60 rounded-xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-[#c9d1d9] font-sans">
        {/* Header Alert */}
        <div className="px-5 py-4 border-b border-[#30363d] bg-[#0d1117] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f85149]/20 border border-[#f85149] flex items-center justify-center text-[#f85149] shrink-0">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold font-mono text-[#f0f6fc] tracking-tight">
                  PROTOCOLO DE EMERGENCIA: ROOTKIT / BOOTKIT CORE INFECTION
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f85149]/20 text-[#f85149] border border-[#f85149]/40 font-bold">
                  NIVEL 0 - RECOVERY
                </span>
              </div>
              <p className="text-xs text-[#8b949e] font-sans">
                Procedimiento de descontaminación de bajo nivel y reflasheo total de firmware cuando no puedes cambiar de dispositivo.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] transition-colors cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tactical Banner */}
        <div className="bg-[#f85149]/10 border-b border-[#f85149]/30 px-5 py-2.5 flex items-start gap-2.5 text-xs text-[#f0f6fc]">
          <AlertTriangle className="w-4 h-4 text-[#f85149] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-[#f85149]">REGLA DE ORO FORENSE Y DE SEGURIDAD OPERACIONAL:</span>
            <p className="text-[#c9d1d9] leading-relaxed">
              Un "Restablecimiento de Fábrica" desde el menú de ajustes <strong>NO ELIMINA</strong> un Rootkit o malware alojado en `/system`, `/vendor` o en el Bootloader. Debes sobrescribir cada partición física de memoria mediante flasheo crudo (Stock ROM original oficial).
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-[#0d1117] border-b border-[#30363d] px-5 py-2 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("SAMSUNG_ODIN")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === "SAMSUNG_ODIN"
                ? "bg-[#1f6feb] text-white font-bold shadow-sm"
                : "bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Samsung (Odin / Heimdall)</span>
          </button>

          <button
            onClick={() => setSelectedCategory("XIAOMI_FASTBOOT")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === "XIAOMI_FASTBOOT"
                ? "bg-[#1f6feb] text-white font-bold shadow-sm"
                : "bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d]"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Xiaomi / Redmi / POCO (Fastboot)</span>
          </button>

          <button
            onClick={() => setSelectedCategory("PIXEL_FASTBOOT")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === "PIXEL_FASTBOOT"
                ? "bg-[#1f6feb] text-white font-bold shadow-sm"
                : "bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d]"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Google Pixel / Motorola / Genérico</span>
          </button>

          <button
            onClick={() => setSelectedCategory("GENERIC_PC_USB")}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === "GENERIC_PC_USB"
                ? "bg-[#1f6feb] text-white font-bold shadow-sm"
                : "bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#30363d]"
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Computador PC (BIOS / Bootable USB)</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#0d1117]/50 font-sans text-xs">
          {selectedCategory === "SAMSUNG_ODIN" && (
            <div className="space-y-4">
              <div className="border border-[#30363d] bg-[#161b22] p-4 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-mono text-[#58a6ff] flex items-center gap-2">
                    <span>1. OBTENCIÓN DE FIRMWARE OFICIAL LIMPIO (Stock ROM)</span>
                  </h4>
                  <span className="text-[10px] font-mono text-[#3fb950] bg-[#23863626] border border-[#238636] px-2 py-0.5 rounded">
                    Sin intermediarios modificados
                  </span>
                </div>
                <p className="text-[#8b949e] leading-relaxed">
                  Para no descargar imágenes con troyanos de foros sospechosos, descarga la ROM directamente desde los servidores oficiales de Samsung con herramientas de código abierto como <strong>Bifrost</strong> o <strong>Samloader</strong> (o sitios verificados como SamFw / Frija):
                </p>

                <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded font-mono text-[11px] space-y-2">
                  <div className="text-[#8b949e]"># Opción Linux/Mac/Windows mediante Python (100% oficial):</div>
                  <div className="flex items-center justify-between text-[#f0f6fc]">
                    <code>pip install samloader && samloader -m SM-G998B -r CHO download -O .</code>
                    <button
                      onClick={() => handleCopy("pip install samloader && samloader -m SM-MODELO -r CSC download -O .", "samloader")}
                      className="text-[#8b949e] hover:text-[#58a6ff] p-1 cursor-pointer"
                    >
                      {copiedKey === "samloader" ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[10px] text-[#8b949e]">
                    * Reemplaza <code>SM-G998B</code> por el modelo exacto de tu teléfono y <code>CHO</code> por tu código de región (CSC).
                  </div>
                </div>
              </div>

              {/* Steps for Odin */}
              <div className="border border-[#30363d] bg-[#161b22] p-4 rounded-lg space-y-3">
                <h4 className="text-sm font-bold font-mono text-[#58a6ff]">
                  2. CONFIGURACIÓN Y FLASH MEDIANTE ODIN (Windows) / HEIMDALL (Linux)
                </h4>
                
                <div className="space-y-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#1f6feb] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-[#f0f6fc]">Modo Download:</strong> Apaga el teléfono por completo. Mantén presionados <code>Bajar Volumen + Subir Volumen</code> simultáneamente y conecta el cable USB al computador hasta que aparezca la pantalla turquesa de advertencia. Presiona <code>Subir Volumen</code> para confirmar.
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#1f6feb] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-[#f0f6fc]">Mapeo de archivos en Odin (v3.14+):</strong> Descomprime el firmware descargado (obtendrás 5 archivos `.tar.md5`):
                      <ul className="list-disc pl-5 mt-1.5 space-y-1 text-[#8b949e]">
                        <li><strong className="text-[#c9d1d9]">BL:</strong> Carga el archivo que empieza con <code>BL_...</code> (Bootloader core).</li>
                        <li><strong className="text-[#c9d1d9]">AP:</strong> Carga el archivo que empieza con <code>AP_...</code> (Sistema operativo completo / System partition).</li>
                        <li><strong className="text-[#c9d1d9]">CP:</strong> Carga el archivo que empieza con <code>CP_...</code> (Módem / Radio firmware).</li>
                        <li><strong className="text-[#f85149]">CSC (CRÍTICO):</strong> Carga el archivo <code>CSC_...</code> (<strong className="text-[#f85149]">NO USES HOME_CSC</strong>). El archivo <code>CSC</code> reformatea las tablas de partición física (PIT) y borra el almacenamiento completo donde reside el Rootkit.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#1f6feb] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <strong className="text-[#f0f6fc]">Ejecutar Flash:</strong> Haz clic en <span className="text-[#3fb950] font-bold">START</span>. No desconectes el cable bajo ninguna circunstancia hasta que el recuadro superior marque <span className="text-[#3fb950] font-bold">PASS!</span> y el teléfono se reinicie automáticamente.
                    </div>
                  </div>
                </div>
              </div>

              {/* Linux Heimdall Option */}
              <div className="border border-[#30363d] bg-[#161b22] p-4 rounded-lg space-y-2">
                <h4 className="text-xs font-bold font-mono text-[#f0f6fc] flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#58a6ff]" />
                  <span>Equivalente en Linux puro con Heimdall (Línea de comandos):</span>
                </h4>
                <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded font-mono text-[11px] text-[#f0f6fc] flex items-center justify-between">
                  <code>sudo heimdall flash --resume --PIT s1.pit --BOOTLOADER sboot.bin --BOOT boot.img --RECOVERY recovery.img --SYSTEM system.img</code>
                  <button
                    onClick={() => handleCopy("sudo heimdall detect && sudo heimdall print-pit", "heimdall")}
                    className="text-[#8b949e] hover:text-[#58a6ff] p-1 cursor-pointer"
                  >
                    {copiedKey === "heimdall" ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "XIAOMI_FASTBOOT" && (
            <div className="space-y-4">
              <div className="border border-[#30363d] bg-[#161b22] p-4 rounded-lg space-y-3">
                <h4 className="text-sm font-bold font-mono text-[#58a6ff]">
                  PROCEDIMIENTO FASTBOOT OFICIAL (MiFlash / Script Flash_All)
                </h4>
                <p className="text-[#8b949e]">
                  Descarga la <strong>Fastboot ROM oficial</strong> (archivo con extensión <code>.tgz</code>, no la Recovery ROM en <code>.zip</code>) desde <em>mifirm.net</em> o <em>xiaomifirmwareupdater.com</em>.
                </p>

                <div className="space-y-3 mt-3">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#1f6feb] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-[#f0f6fc]">Entrar en Modo Fastboot:</strong> Apaga el dispositivo. Mantén presionados <code>Bajar Volumen + Botón Encendido</code> hasta que aparezca el logo FASTBOOT (Mitu reparando a Android o texto naranja).
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#1f6feb] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-[#f0f6fc]">Descomprimir y ejecutar script de limpieza total:</strong>
                      <p className="text-[#8b949e] mt-1">
                        Descomprime el archivo <code>.tgz</code> con 7-Zip dos veces hasta ver la carpeta con los archivos <code>flash_all.bat</code> (Windows) o <code>flash_all.sh</code> (Linux).
                      </p>
                      <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded font-mono text-[11px] text-[#f0f6fc] mt-2 flex items-center justify-between">
                        <code>./flash_all.sh # O en Windows: doble clic a flash_all.bat</code>
                        <button
                          onClick={() => handleCopy("./flash_all.sh", "flash_all")}
                          className="text-[#8b949e] hover:text-[#58a6ff] p-1 cursor-pointer"
                        >
                          {copiedKey === "flash_all" ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-[11px] text-[#f85149] mt-1.5 font-bold">
                        ⚠️ NUNCA selecciones <code>flash_all_except_storage</code> cuando hay un rootkit activo. Debe ser <code>clean all</code> / <code>flash_all</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "PIXEL_FASTBOOT" && (
            <div className="space-y-4">
              <div className="border border-[#30363d] bg-[#161b22] p-4 rounded-lg space-y-3">
                <h4 className="text-sm font-bold font-mono text-[#58a6ff]">
                  GOOGLE PIXEL & DISPOSITIVOS CON FASTBOOT ESTÁNDAR
                </h4>
                <p className="text-[#8b949e]">
                  Google ofrece la herramienta web oficial <strong>Android Flash Tool</strong> (<code>flash.android.com</code>) que interactúa con WebUSB directamente desde Chrome/Brave en modo Fastboot sin necesidad de instalar suites externas.
                </p>

                <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-lg space-y-2">
                  <div className="text-[#f0f6fc] font-bold font-mono">Comandos manuales con Platform Tools (adb/fastboot):</div>
                  <div className="space-y-1.5 font-mono text-[11px] text-[#58a6ff]">
                    <div>1. fastboot devices</div>
                    <div>2. fastboot flashing unlock # (Si no está desbloqueado)</div>
                    <div>3. ./flash-all.sh # (Ejecuta el script oficial de Google que formatea particiones A/B)</div>
                    <div>4. fastboot flashing lock # (Bloquea de nuevo el bootloader para restaurar Verified Boot)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedCategory === "GENERIC_PC_USB" && (
            <div className="space-y-4">
              <div className="border border-[#30363d] bg-[#161b22] p-4 rounded-lg space-y-3">
                <h4 className="text-sm font-bold font-mono text-[#f85149]">
                  COMPUTADOR AFECTADO POR BOOTKIT / UEFI MALWARE (UEFI ROOTKIT)
                </h4>
                <p className="text-[#8b949e] leading-relaxed">
                  Si el compromiso es a nivel de UEFI/BIOS (como BlackLotus, CosmicStrand o MoonBounce), reinstalar Windows o Linux normalmente no sirve porque el malware se inyecta antes del arranque del kernel.
                </p>

                <div className="space-y-3 mt-2">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#f85149] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <strong className="text-[#f0f6fc]">Flasheo de Firmware de BIOS/UEFI en Frío:</strong>
                      <p className="text-[#8b949e] mt-0.5">
                        Descarga la actualización oficial de BIOS desde el fabricante (Lenovo, Dell, ASUS, etc.) desde una máquina limpia. Usa la función <strong>BIOS FlashBack</strong> (botón físico trasero en placas madre) o reflashea la BIOS desde el menú UEFI mediante USB para sobrescribir la EEPROM física.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#f85149] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <strong className="text-[#f0f6fc]">Limpieza total de Tablas de Partición GPT/MBR (Zero-Fill MBR):</strong>
                      <p className="text-[#8b949e] mt-0.5">
                        Arranca con un Live USB de Linux (Ubuntu/Debian) y sobrescribe los primeros sectores del disco físico donde se aloja el Boot Sector corrupto:
                      </p>
                      <div className="bg-[#0d1117] border border-[#30363d] p-3 rounded font-mono text-[11px] text-[#f0f6fc] mt-2 flex items-center justify-between">
                        <code>sudo dd if=/dev/zero of=/dev/nvme0n1 bs=1M count=100 && sync</code>
                        <button
                          onClick={() => handleCopy("sudo dd if=/dev/zero of=/dev/nvme0n1 bs=1M count=100 && sync", "dd_clean")}
                          className="text-[#8b949e] hover:text-[#58a6ff] p-1 cursor-pointer"
                        >
                          {copiedKey === "dd_clean" ? <Check className="w-3.5 h-3.5 text-[#3fb950]" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-[#8b949e] mt-1">
                        * Reemplaza <code>/dev/nvme0n1</code> o <code>/dev/sda</code> con tu disco real. Esto aniquila el bootloader y particiones infectadas antes de instalar el SO limpio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Checklist de Blindaje Post-Recovery */}
          <div className="border border-[#238636]/40 bg-[#238636]/10 p-4 rounded-lg space-y-2">
            <h4 className="text-xs font-bold font-mono text-[#3fb950] flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>PASOS OBLIGATORIOS POST-RECUPERACIÓN (Para no volver a ser infectado):</span>
            </h4>
            <ul className="list-disc pl-5 text-[#c9d1d9] space-y-1 text-xs">
              <li><strong>NO RESTAURES COPIAS DE SEGURIDAD DE APLICACIONES:</strong> Restaura únicamente fotos, documentos y archivos planos (sin `.apk`, `.exe` o scripts).</li>
              <li><strong>CAMBIA TODAS LAS CONTRASEÑAS DESDE UN DISPOSITIVO DISTINTO:</strong> Si el rootkit tenía Keylogger o Session Hijacker, todas las credenciales registradas están en manos del atacante.</li>
              <li><strong>ACTIVA 2FA CON LLAVE FÍSICA O APP AUTORIZADA:</strong> Evita 2FA por SMS si sospechas de clonación de SIM.</li>
              <li><strong>BLOQUEA DE NUEVO EL BOOTLOADER:</strong> El Secure Boot / Android Verified Boot previene la carga de kernels no firmados.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#30363d] bg-[#0d1117] flex items-center justify-between">
          <div className="text-[11px] font-mono text-[#8b949e] flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>Guía Pericial DFIR • Preservación y Descontaminación de Emergencia</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-[#f0f6fc] text-xs font-mono font-medium transition-colors border border-[#30363d] hover:border-[#8b949e] cursor-pointer"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
