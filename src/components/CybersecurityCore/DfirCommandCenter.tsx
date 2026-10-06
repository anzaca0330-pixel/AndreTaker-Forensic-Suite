import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  HardDrive,
  Users,
  Lock,
  Radio,
  FileCode2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Globe,
  Terminal,
} from "lucide-react";
import { SecurityIncidentEvent } from "../../types";

const INCIDENT_TIMELINE: SecurityIncidentEvent[] = [
  {
    id: "evt-1",
    date: "18 Marzo 2026",
    phase: "Concepción & Génesis",
    title: "El Sueño de Baba Yaga",
    description:
      "La investigadora principal Andrea Zabala experimenta el sueño premonitorio que inspira el motor Baba Yaga: la que ve en la penumbra, desentierra la verdad oculta y desmonta los vectores sintéticos.",
    forensicVector: "Concepción de la arquitectura de inspección de bajo nivel para streams binarios.",
    mitigationAction: "Fundamentos teóricos y primeros bocetos del ecosistema forense.",
    status: "PRESERVED",
  },
  {
    id: "evt-1b",
    date: "31 Mayo 2026",
    phase: "Elecciones Presidenciales (1ª Vuelta)",
    title: "Primera Vuelta Presidencial en Colombia",
    description:
      "Jornada electoral oficial de primera vuelta en Colombia. Activación de los primeros protocolos de monitoreo pericial y recolección de actas electorales E-14.",
    forensicVector: "Monitoreo de transmisión y recepción de transmisiones oficiales.",
    mitigationAction: "Inicio de captura sistemática y registro preliminar de discrepancias.",
    status: "PRESERVED",
  },
  {
    id: "evt-1c",
    date: "01 - 06 Junio 2026",
    phase: "Hallazgo Forense Crítico",
    title: "Descubrimiento de Páginas en Blanco y Blind Masking",
    description:
      "Entre el 1 y el 6 de junio de 2026, la investigación descubre las primeras páginas deliberadamente en blanco y la técnica de blind masking (enmascaramiento ciego) en actas E-14 para ocultar la votación real.",
    forensicVector: "Inyección de máscaras ciegas 1bpc, supresión de contenido visual y capas de superposición sintéticas.",
    mitigationAction: "Desarrollo del extractor de streams binarios /FlateDecode y detección de deltas XREF fantasma (+2).",
    status: "DEFENDED",
  },
  {
    id: "evt-2",
    date: "21 Junio 2026",
    phase: "Rescate Masivo de Datos",
    title: "Descarga Masiva de 121.960 PDFs de Delegados",
    description:
      "Activación de la red de 75.000 Testigos Digitales (Frente Digital 2026). Descarga y congelamiento criptográfico de 121.960 actas antes de ser sobrescritas por servidores oficiales.",
    forensicVector: "Inyección de scripts automatizados en la capa de transmisión y alteración del conteo.",
    mitigationAction: "Sellado inmediato de hashes SHA-256 en firmas_criptograficas_sha256.txt bajo norma ISO 27037.",
    status: "DEFENDED",
  },
  {
    id: "evt-3",
    date: "08 Junio 2026",
    phase: "Asedio Cibernético Activo",
    title: "Ataque Dirigido de Rootkit / Bootkit a Nivel Kernel",
    description:
      "Infección hostil a nivel UEFI/Kernel para destruir la evidencia en almacenamiento local. 20 días de aislamiento cibernético total sin conexión a Internet.",
    forensicVector: "Persistencia en firmware EEPROM y particiones del sistema /boot y /vendor.",
    mitigationAction:
      "Reflasheo de hardware en frío con BIOS FlashBack y aplicación de Esteganografía de Sistema de Archivos.",
    status: "ISOLATED",
  },
  {
    id: "evt-4",
    date: "Junio - Julio 2026",
    phase: "Esteganografía Operacional",
    title: "Ocultamiento de Base de Datos Forense",
    description:
      "Protección de la base de datos de 117.994 registros mediante camuflaje de bajo nivel en el sistema de archivos.",
    forensicVector: "Barridos forenses hostiles y exfiltración de metadatos.",
    mitigationAction:
      "Camuflaje binario como 'Fotos del Cumpleaños de...' en particiones cifradas en frío.",
    status: "PRESERVED",
  },
  {
    id: "evt-5",
    date: "07 Agosto 2026",
    phase: "Preservación Internacional",
    title: "Cruce de Frontera a Canadá & Bóveda Maestra",
    description:
      "La investigadora Andrea Zabala cruza la frontera hacia Canadá con más de 677 GB de evidencia intacta salvaguardada en 3 bóvedas físicas.",
    forensicVector: "Intentos de decomiso y alteración física de medios de almacenamiento.",
    mitigationAction:
      "Distribución de la evidencia en D A T A1 (406 GB), ANZACA (79.71 GB) y BACKUP (6.9 GB) con custodia auditada.",
    status: "CROSS_BORDER",
  },
];

interface DfirCommandCenterProps {
  onOpenRecovery: () => void;
  onOpenVaults: () => void;
  onOpenTerminal: () => void;
}

export const DfirCommandCenter: React.FC<DfirCommandCenterProps> = ({
  onOpenRecovery,
  onOpenVaults,
  onOpenTerminal,
}) => {
  const [selectedIncident, setSelectedIncident] = useState<SecurityIncidentEvent>(
    INCIDENT_TIMELINE[2]
  );

  return (
    <div className="space-y-6">
      {/* Top Banner: Cyber Defense & Siege Status */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#f85149] rounded-full blur-3xl opacity-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#da363326] text-[#f85149] border border-[#da3633]">
                <ShieldAlert className="w-3.5 h-3.5" />
                DEFENSA DFIR & RESPUESTA A INCIDENTES
              </span>
              <span className="text-xs font-mono text-[#3fb950] flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Cadena de Custodia ISO/IEC 27037
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#f0f6fc] tracking-tight">
              Núcleo de Ciberseguridad & Telemetría de Asedio
            </h2>

            <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
              Módulo de alta contención para auditoría de intrusiones, monitoreo de ciberataques,
              protocolos de descontaminación de hardware y salvaguarda de más de{" "}
              <strong className="text-[#f0f6fc]">677 Gigabytes de evidencia original</strong>{" "}
              rescatada bajo 20 días de asedio cibernético directo.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 items-center">
            <button
              onClick={onOpenRecovery}
              className="px-3.5 py-2 rounded-md bg-[#f85149]/20 hover:bg-[#f85149]/30 border border-[#f85149]/50 text-[#f85149] hover:text-white text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Flame className="w-4 h-4 animate-pulse text-[#f85149]" />
              <span>Protocolo Rootkit</span>
            </button>

            <button
              onClick={onOpenVaults}
              className="px-3.5 py-2 rounded-md bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] hover:text-[#f0f6fc] text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
            >
              <HardDrive className="w-4 h-4 text-[#58a6ff]" />
              <span>Bóvedas 677 GB</span>
            </button>
          </div>
        </div>

        {/* 4 Pillars Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#30363d]">
          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d]">
            <div className="text-[11px] font-mono text-[#8b949e] flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-[#58a6ff]" />
              Volumen Total
            </div>
            <div className="text-lg font-mono font-bold text-[#f0f6fc] mt-1">&gt; 677 GB</div>
            <div className="text-[10px] text-[#3fb950] font-mono">3 Bóvedas + NVMe</div>
          </div>

          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d]">
            <div className="text-[11px] font-mono text-[#8b949e] flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-[#d29922]" />
              Actas Rescatadas
            </div>
            <div className="text-lg font-mono font-bold text-[#f0f6fc] mt-1">&gt; 147.000</div>
            <div className="text-[10px] text-[#8b949e] font-mono">121.960 Delegados</div>
          </div>

          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d]">
            <div className="text-[11px] font-mono text-[#8b949e] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#3fb950]" />
              Testigos Digitales
            </div>
            <div className="text-lg font-mono font-bold text-[#f0f6fc] mt-1">75.000</div>
            <div className="text-[10px] text-[#3fb950] font-mono">Red Descentralizada</div>
          </div>

          <div className="p-3 rounded-md bg-[#0d1117] border border-[#30363d]">
            <div className="text-[11px] font-mono text-[#8b949e] flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#f85149]" />
              Asedio Superado
            </div>
            <div className="text-lg font-mono font-bold text-[#f0f6fc] mt-1">20 Días</div>
            <div className="text-[10px] text-[#f85149] font-mono">Aislamiento Total</div>
          </div>
        </div>
      </div>

      {/* Incident Timeline & Forensic Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Timeline (5 cols) */}
        <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#58a6ff]" />
              Cronología de Asedio y Rescate
            </h3>
            <span className="text-[11px] font-mono text-[#8b949e]">2026 (Preservado)</span>
          </div>

          <div className="space-y-2.5">
            {INCIDENT_TIMELINE.map((evt) => {
              const isSelected = selectedIncident.id === evt.id;
              return (
                <button
                  key={evt.id}
                  onClick={() => setSelectedIncident(evt)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#21262d] border-[#58a6ff] shadow-sm"
                      : "bg-[#0d1117] border-[#30363d] hover:border-[#8b949e]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold text-[#58a6ff] px-2 py-0.5 rounded bg-[#1f6feb20] border border-[#388bfd40]">
                      {evt.date}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        evt.status === "ISOLATED"
                          ? "bg-[#da363326] text-[#f85149]"
                          : evt.status === "DEFENDED"
                          ? "bg-[#23863626] text-[#3fb950]"
                          : "bg-[#1f6feb26] text-[#58a6ff]"
                      }`}
                    >
                      {evt.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#f0f6fc] mt-1.5 truncate">{evt.title}</h4>
                  <p className="text-[11px] text-[#8b949e] line-clamp-1 mt-0.5">{evt.phase}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Incident & Vector Analysis (7 cols) */}
        <div className="lg:col-span-7 bg-[#161b22] border border-[#30363d] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#58a6ff] uppercase tracking-wider">
                Detalle Pericial de Evento
              </span>
              <h3 className="text-base font-bold text-[#f0f6fc] mt-0.5">
                {selectedIncident.title}
              </h3>
            </div>
            <span className="text-xs font-mono text-[#8b949e] px-2 py-1 rounded bg-[#0d1117] border border-[#30363d]">
              {selectedIncident.date}
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#c9d1d9] leading-relaxed font-sans">
            <p>{selectedIncident.description}</p>

            {/* Vector & Mitigation Cards */}
            <div className="p-3.5 rounded-lg bg-[#0d1117] border border-[#f85149]/30 space-y-1.5">
              <div className="text-[11px] font-mono font-bold text-[#f85149] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Vector de Ataque / Amenaza Identificada
              </div>
              <p className="text-xs font-mono text-[#f0f6fc]">
                {selectedIncident.forensicVector}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0d1117] border border-[#238636]/40 space-y-1.5">
              <div className="text-[11px] font-mono font-bold text-[#3fb950] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Acción de Mitigación & Preservación Forense
              </div>
              <p className="text-xs font-mono text-[#f0f6fc]">
                {selectedIncident.mitigationAction}
              </p>
            </div>
          </div>

          {/* Standards & Direct Actions */}
          <div className="pt-3 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-3">
            <div className="text-[11px] font-mono text-[#8b949e] flex items-center gap-2">
              <span>Normas:</span>
              <span className="text-[#c9d1d9]">ISO/IEC 27037</span>
              <span>•</span>
              <span className="text-[#c9d1d9]">NIST SP 800-86</span>
              <span>•</span>
              <span className="text-[#c9d1d9]">RFC 3227</span>
            </div>

            <button
              onClick={onOpenTerminal}
              className="px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] text-xs font-mono text-[#58a6ff] hover:text-white border border-[#30363d] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Abrir CLI Forense</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
