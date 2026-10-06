import { Language } from "../types";

export interface Translations {
  // Brand & Header
  brandSubtitle: string;
  investigatorRole: string;
  witnessCount: string;
  core1Title: string;
  core2Title: string;
  core1Subtitle: string;
  core2Subtitle: string;
  lightweightMode: string;
  lightweightOn: string;
  lightweightOff: string;
  lightweightTooltip: string;
  activeEngine: string;
  samplesLabel: string;
  analyzePdfBtn: string;
  analyzingPdfBtn: string;
  reportBtn: string;
  masterDocBtn: string;
  rootkitProtocolBtn: string;
  toolsBtn: string;
  languageBtn: string;
  langEs: string;
  langEn: string;
  langFr: string;
  
  // Core Switcher
  activeCoreIndicator: string;
  core1NameLong: string;
  core2NameLong: string;
  switchToCore1: string;
  switchToCore2: string;

  // Forensic Core Tabs
  tabStructure: string;
  tabMetadata: string;
  tabImages: string;
  tabBenford: string;
  tabScars: string;
  tabAudiences: string;

  // Cybersecurity Core Tabs
  tabTimeline: string;
  tabVaults: string;
  tabRootkitRecovery: string;
  tabTerminalCli: string;
  tabOracle: string;

  // Verdicts & Common
  verdictTampered: string;
  verdictSuspicious: string;
  verdictClean: string;
  riskScoreLabel: string;
  confidenceLabel: string;
  viewReportAction: string;
  askAiAction: string;
  dropFileTitle: string;
  dropFileSubtitle: string;
  cleanFileMessage: string;
  noScarsDetected: string;
  scarsDetectedCount: string;
  footerStandard: string;
}

export const translations: Record<Language, Translations> = {
  ES: {
    brandSubtitle: "DFIR & Ingeniería Inversa",
    investigatorRole: "Investigadora Principal: Andrea Zabala (AnZaCa / AndreTaker)",
    witnessCount: "75.000 Testigos Digitales",
    core1Title: "NÚCLEO 1: ANÁLISIS FORENSE",
    core2Title: "NÚCLEO 2: CIBERSEGURIDAD",
    core1Subtitle: "Baba Yaga / Tycho • Inspector Binario E-14 & PDF",
    core2Subtitle: "Antigravity Shield • Respuesta DFIR, Protocolo Rootkit & Bóvedas 677 GB",
    lightweightMode: "Modo Liviano",
    lightweightOn: "ACTIVADO",
    lightweightOff: "DESACTIVADO",
    lightweightTooltip: "Modo Liviano: Reduce el consumo de memoria RAM y optimiza el rendimiento del navegador",
    activeEngine: "Motor Activo:",
    samplesLabel: "Muestras:",
    analyzePdfBtn: "Analizar PDF",
    analyzingPdfBtn: "Analizando...",
    reportBtn: "Reporte",
    masterDocBtn: "Doc Maestro",
    rootkitProtocolBtn: "Protocolo Rootkit",
    toolsBtn: "Herramientas",
    languageBtn: "Idioma",
    langEs: "Español",
    langEn: "English",
    langFr: "Français",

    activeCoreIndicator: "Núcleo Operativo Seleccionado",
    core1NameLong: "🔬 Núcleo 1: Análisis Forense E-14 (Baba Yaga & Tycho Engine)",
    core2NameLong: "🛡️ Núcleo 2: Ciberseguridad & DFIR Ops (Antigravity & Shield)",
    switchToCore1: "Cambiar a Núcleo Análisis 🔬",
    switchToCore2: "Cambiar a Núcleo Ciberseguridad 🛡️",

    tabStructure: "1. Estructura (XREF)",
    tabMetadata: "2. Metadatos",
    tabImages: "3. Imágenes (ELA)",
    tabBenford: "4. Benford (2BL)",
    tabScars: "5. Cicatrices Forenses",
    tabAudiences: "6. Reporte Tri-Audiencia",

    tabTimeline: "1. Línea de Tiempo DFIR",
    tabVaults: "2. Bóvedas Criptográficas (677 GB)",
    tabRootkitRecovery: "3. Protocolo Rootkit",
    tabTerminalCli: "4. Terminal babayaga_core.py",
    tabOracle: "5. Oráculo IA (Antigravity)",

    verdictTampered: "ALTERADO",
    verdictSuspicious: "SOSPECHOSO",
    verdictClean: "LIMPIO",
    riskScoreLabel: "Índice de Riesgo Forense",
    confidenceLabel: "Confianza Pericial",
    viewReportAction: "Ver Dictamen Completo",
    askAiAction: "Consultar Oráculo IA",
    dropFileTitle: "Suelte el archivo PDF para iniciar el análisis forense",
    dropFileSubtitle: "AndreTaker (BabaYaga Core) inspeccionará tablas XREF, metadatos, artefactos raster y Benford 2BL",
    cleanFileMessage: "Estructura estándar sin alteraciones aparentes",
    noScarsDetected: "Sin cicatrices estructurales ni vectores de manipulación",
    scarsDetectedCount: "Cicatrices Forenses Identificadas",
    footerStandard: "Suite Forense Digital y Ciberseguridad DFIR",
  },
  EN: {
    brandSubtitle: "DFIR & Reverse Engineering",
    investigatorRole: "Lead Investigator: Andrea Zabala (AnZaCa / AndreTaker)",
    witnessCount: "75,000 Digital Witnesses",
    core1Title: "CORE 1: FORENSIC ANALYSIS",
    core2Title: "CORE 2: CYBERSECURITY",
    core1Subtitle: "Baba Yaga / Tycho • E-14 & PDF Binary Deep Inspector",
    core2Subtitle: "Antigravity Shield • DFIR Response, Rootkit Protocol & 677 GB Vaults",
    lightweightMode: "Lightweight Mode",
    lightweightOn: "ENABLED",
    lightweightOff: "DISABLED",
    lightweightTooltip: "Lightweight Mode: Reduces RAM memory footprint and optimizes browser performance",
    activeEngine: "Active Engine:",
    samplesLabel: "Samples:",
    analyzePdfBtn: "Analyze PDF",
    analyzingPdfBtn: "Analyzing...",
    reportBtn: "Report",
    masterDocBtn: "Master Doc",
    rootkitProtocolBtn: "Rootkit Protocol",
    toolsBtn: "Tools",
    languageBtn: "Language",
    langEs: "Español",
    langEn: "English",
    langFr: "Français",

    activeCoreIndicator: "Selected Operational Core",
    core1NameLong: "🔬 Core 1: E-14 Forensic Analysis (Baba Yaga & Tycho Engine)",
    core2NameLong: "🛡️ Core 2: Cybersecurity & DFIR Ops (Antigravity & Shield)",
    switchToCore1: "Switch to Forensic Core 🔬",
    switchToCore2: "Switch to Cybersecurity Core 🛡️",

    tabStructure: "1. Structure (XREF)",
    tabMetadata: "2. Metadata",
    tabImages: "3. Images (ELA)",
    tabBenford: "4. Benford (2BL)",
    tabScars: "5. Forensic Scars",
    tabAudiences: "6. Tri-Audience Report",

    tabTimeline: "1. DFIR Incident Timeline",
    tabVaults: "2. Crypto Vaults (677 GB)",
    tabRootkitRecovery: "3. Rootkit Protocol",
    tabTerminalCli: "4. CLI babayaga_core.py",
    tabOracle: "5. AI Oracle (Antigravity)",

    verdictTampered: "TAMPERED",
    verdictSuspicious: "SUSPICIOUS",
    verdictClean: "CLEAN",
    riskScoreLabel: "Forensic Risk Index",
    confidenceLabel: "Expert Confidence",
    viewReportAction: "View Full Forensic Finding",
    askAiAction: "Query AI Oracle",
    dropFileTitle: "Drop PDF file to begin forensic examination",
    dropFileSubtitle: "AndreTaker (BabaYaga Core) will inspect XREF tables, metadata, raster artifacts, and Benford 2BL",
    cleanFileMessage: "Standard structure without apparent tampering",
    noScarsDetected: "No structural scars or tampering vectors detected",
    scarsDetectedCount: "Identified Forensic Scars",
    footerStandard: "Digital Forensic Suite & DFIR Incident Response",
  },
  FR: {
    brandSubtitle: "DFIR & Rétro-Ingénierie",
    investigatorRole: "Enquêtrice Principale : Andrea Zabala (AnZaCa / AndreTaker)",
    witnessCount: "75 000 Témoins Numériques",
    core1Title: "NOYAU 1 : ANALYSE FORENSIQUE",
    core2Title: "NOYAU 2 : CYBERDÉFENSE",
    core1Subtitle: "Baba Yaga / Tycho • Inspecteur Binaire E-14 & PDF",
    core2Subtitle: "Antigravity Shield • Réponse DFIR, Protocole Rootkit & Coffres 677 Go",
    lightweightMode: "Mode Léger",
    lightweightOn: "ACTIVÉ",
    lightweightOff: "DÉSACTIVÉ",
    lightweightTooltip: "Mode Léger : Réduit l'empreinte mémoire vive et optimise les performances du navigateur",
    activeEngine: "Moteur Actif :",
    samplesLabel: "Échantillons :",
    analyzePdfBtn: "Analyser le PDF",
    analyzingPdfBtn: "Analyse en cours...",
    reportBtn: "Rapport",
    masterDocBtn: "Doc Maître",
    rootkitProtocolBtn: "Protocole Rootkit",
    toolsBtn: "Outils",
    languageBtn: "Langue",
    langEs: "Español",
    langEn: "English",
    langFr: "Français",

    activeCoreIndicator: "Noyau Opérationnel Sélectionné",
    core1NameLong: "🔬 Noyau 1 : Analyse Forensique E-14 (Moteur Baba Yaga & Tycho)",
    core2NameLong: "🛡️ Noyau 2 : Opérations Cyberdéfense & DFIR (Antigravity & Shield)",
    switchToCore1: "Passer au Noyau Forensique 🔬",
    switchToCore2: "Passer au Noyau Cyberdéfense 🛡️",

    tabStructure: "1. Structure (XREF)",
    tabMetadata: "2. Métadonnées",
    tabImages: "3. Images (ELA)",
    tabBenford: "4. Benford (2BL)",
    tabScars: "5. Cicatrices Forensiques",
    tabAudiences: "6. Rapport Tri-Public",

    tabTimeline: "1. Chronologie Incidents DFIR",
    tabVaults: "2. Coffres Crypto (677 Go)",
    tabRootkitRecovery: "3. Protocole Rootkit",
    tabTerminalCli: "4. CLI babayaga_core.py",
    tabOracle: "5. Oracle IA (Antigravity)",

    verdictTampered: "ALTÉRÉ",
    verdictSuspicious: "SUSPECT",
    verdictClean: "INTÈGRE",
    riskScoreLabel: "Indice de Risque Forensique",
    confidenceLabel: "Confiance de l'Expert",
    viewReportAction: "Voir la Conclusion Complète",
    askAiAction: "Consulter l'Oracle IA",
    dropFileTitle: "Déposer un fichier PDF pour commencer l'examen forensique",
    dropFileSubtitle: "AndreTaker (BabaYaga Core) examinera les tables XREF, métadonnées, artefacts et la Loi de Benford 2BL",
    cleanFileMessage: "Structure standard sans altération apparente",
    noScarsDetected: "Aucune cicatrice structurelle ni vecteur d'altération détecté",
    scarsDetectedCount: "Cicatrices Forensiques Identifiées",
    footerStandard: "Suite Forensique Numérique & Réponse aux Incidents DFIR",
  },
};
