export interface ToolStatus {
  name: string;
  command: string;
  installed: boolean;
  purpose: string;
  version?: string;
}

export interface IncrementalRevision {
  revisionNumber: number;
  offset: number;
  length: number;
  objectCount: number;
  timestamp?: string;
  hasPrevTrailer: boolean;
  notes: string;
}

export interface PdfObjectNode {
  id: number;
  gen: number;
  type: string;
  offset: number;
  length: number;
  isStream: boolean;
  streamLength?: number;
  filter?: string;
  isOrphan?: boolean;
  isSuspicious?: boolean;
  suspicionReason?: string;
  rawSnippet?: string;
}

export interface StructuralAnalysis {
  XREF_corrupta: boolean;
  detalle: string;
  pdfVersion: string;
  fileSizeBytes: number;
  hashSha256: string;
  incrementalRevisionsCount: number;
  revisions: IncrementalRevision[];
  totalObjects: number;
  orphanObjectsCount: number;
  streamCount: number;
  hasEmbeddedJavascript: boolean;
  hasSuspiciousActions: boolean;
  isLinearized: boolean;
  trailerIdMismatch: boolean;
  trailerOriginalId?: string;
  trailerCurrentId?: string;
  objects: PdfObjectNode[];
  rawTrailerText?: string;
}

export interface MetadataAnalysis {
  metadatos: string;
  title?: string;
  author?: string;
  creator?: string;
  producer?: string;
  createDate?: string;
  modifyDate?: string;
  metadataDate?: string;
  xmpToolkit?: string;
  softwareFingerprint?: string;
  discrepanciaTemporal: boolean;
  discrepanciaDetalle?: string;
  producerMismatch: boolean;
  producerDetails?: string;
  rawXmp?: string;
  rawInfoDict?: Record<string, string>;
}

export interface ExtractedImage {
  id: string;
  name: string;
  width: number;
  height: number;
  colorspace: string;
  meanBrightness: number;
  compression: string;
  elaScore: number; // 0-100 anomaly level
  isSuspicious: boolean;
  suspicionReason?: string;
  dataUrl?: string;
  decodedQrOrBarcode?: string;
}

export interface ImageAnalysisResult {
  imagenes: ExtractedImage[];
  totalImages: number;
  suspiciousImagesCount: number;
  hasLayerOverlay: boolean;
  hasMismatchedCompression: boolean;
  detectedBarcodes: string[];
}

export interface BenfordDigitStat {
  digit: number;
  actualCount: number;
  actualFreq: number; // 0-100%
  expectedFreq: number; // 0-100%
  zScore: number;
  isAnomaly: boolean;
}

export interface BenfordAnalysisResult {
  benford: string;
  totalNumbersAnalyzed: number;
  chiSquare: number;
  pValue: number;
  mad: number; // Mean Absolute Deviation
  madStatus: "CONFORMING" | "ACCEPTABLE" | "MARGINAL" | "NON_CONFORMING";
  firstDigitStats: BenfordDigitStat[];
  secondDigitStats: BenfordDigitStat[];
  suspiciousNumbers: Array<{
    value: number;
    rawText: string;
    reason: string;
  }>;
  lawApplied: "1BL" | "2BL" | "BOTH";
}

export interface ForensicCicatrice {
  id: string;
  category: "ESTRUCTURA" | "METADATOS" | "IMAGENES" | "BENFORD" | "CRONOLOGÍA";
  severity: "CRITICA" | "ALTA" | "MEDIA" | "BAJA" | "INFO";
  title: string;
  description: string;
  evidence: string;
  technicalTrace: string;
}

export interface ForensicReport {
  id: string;
  fileName: string;
  analyzedAt: string;
  fileSizeBytes: number;
  sha256: string;
  veredictoFinal: "ALTERADO" | "SOSPECHOSO" | "LIMPIO";
  veredictoTexto: string;
  riesgoScore: number; // 0 to 100
  estructura: StructuralAnalysis;
  metadatos: MetadataAnalysis;
  imagenes: ImageAnalysisResult;
  benford: BenfordAnalysisResult;
  cicatrices: ForensicCicatrice[];
  aiVerdict?: {
    verdictText: string;
    confidence?: number;
    keyFindings?: string[];
    legalRecommendation?: string;
  };
  rawMarkdownReport: string;
}

export interface SampleCase {
  id: string;
  name: string;
  badge: string;
  verdict: "ALTERADO" | "SOSPECHOSO" | "LIMPIO";
  riskScore: number;
  description: string;
  tamperVector: string;
  data: ForensicReport;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export type ActiveEngineCore = "ANALYSIS" | "CYBERSECURITY";

export type Language = "ES" | "EN" | "FR";

export interface CoreEngineConfig {
  activeCore: ActiveEngineCore;
  analysisEnabled: boolean;
  cybersecurityEnabled: boolean;
  lightweightMode: boolean; // Reduces memory & overhead, disables heavy canvas/animations
  devilFallbackEnabled: boolean; // Pure Python/JS fallback mode without external dependencies
}

export interface SecurityIncidentEvent {
  id: string;
  date: string;
  phase: string;
  title: string;
  description: string;
  forensicVector: string;
  mitigationAction: string;
  status: "DEFENDED" | "ISOLATED" | "CROSS_BORDER" | "PRESERVED";
}

export interface CryptoVaultInfo {
  id: string;
  name: string;
  deviceLabel: string;
  capacity: string;
  verifiedFilesCount: number;
  sha256Frozen: boolean;
  description: string;
  storageType: "HDD" | "NVMe" | "COLD_BACKUP" | "DISTRIBUTED";
}
