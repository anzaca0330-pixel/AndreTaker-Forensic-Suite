import { SampleCase, ToolStatus } from "../types";
import { BENFORD_1BL_THEORY, BENFORD_2BL_THEORY } from "./pdfForensics";

export const DEFAULT_TOOLS: ToolStatus[] = [
  {
    name: "qpdf",
    command: "qpdf --check",
    installed: true,
    purpose: "Low-level structural analysis, XREF table validation, and binary object stream inspection",
    version: "v11.6.4",
  },
  {
    name: "exiftool",
    command: "exiftool -Creator -Producer -CreateDate -ModDate",
    installed: true,
    purpose: "Comprehensive extraction of EXIF metadata, XMP schemas, and authoring tool software history",
    version: "v12.76",
  },
  {
    name: "pdfimages",
    command: "pdfimages -png",
    installed: true,
    purpose: "Native extraction of embedded raster bitmaps and vector layers without compression loss",
    version: "v24.02.0 (Poppler)",
  },
  {
    name: "identify",
    command: "identify -format '%[colorspace] %[mean]'",
    installed: true,
    purpose: "Color space auditing, mean luminance verification, and ELA artifacts detection (ImageMagick)",
    version: "v7.1.1-33",
  },
  {
    name: "zbarimg",
    command: "zbarimg --raw",
    installed: true,
    purpose: "Forensic decoding and payload inspection for QR codes, DataMatrix, and barcodes",
    version: "v0.23.90",
  },
  {
    name: "benford_2bl",
    command: "babayaga_benford --law 2BL --mad",
    installed: true,
    purpose: "Statistical fraud detection engine for numerical distributions and financial tally verification",
    version: "v1.4.0 (BabaYaga Core)",
  },
];

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: "case-invoice-tampered",
    name: "Commercial Invoice #4092 (Amount Tampering)",
    badge: "TAMPERED - RISK 88%",
    verdict: "ALTERADO",
    riskScore: 88,
    description:
      "Technology services invoice where the total amount was inflated from $1,450.00 to $14,500.00 using Adobe Photoshop and re-saved with conflicting XREF tables.",
    tamperVector: "Incremental XREF revision + Photoshop Metadata + Benford Law violation in totals",
    data: {
      id: "rep-case-1",
      fileName: "Tech_Invoice_4092_Tampered.pdf",
      analyzedAt: "2026-08-27 14:15:22",
      fileSizeBytes: 482190,
      sha256: "e7b99c43a04efc78864d2719a9f24c965784918e90a56fbc8a13a290bf41c9a1",
      veredictoFinal: "ALTERADO",
      veredictoTexto: "⚠️ Structural and metadata scars detected. The file has been manipulated.",
      riesgoScore: 88,
      estructura: {
        XREF_corrupta: true,
        detalle:
          "reported number of objects (48) does not match trailer /Size (52). 3 incremental revisions identified with overlapping XREF tables.",
        pdfVersion: "1.6",
        fileSizeBytes: 482190,
        hashSha256: "e7b99c43a04efc78864d2719a9f24c965784918e90a56fbc8a13a290bf41c9a1",
        incrementalRevisionsCount: 3,
        revisions: [
          {
            revisionNumber: 1,
            offset: 142050,
            length: 142050,
            objectCount: 32,
            hasPrevTrailer: false,
            notes: "Initial creation (ERP Billing System)",
          },
          {
            revisionNumber: 2,
            offset: 310890,
            length: 168840,
            objectCount: 10,
            hasPrevTrailer: true,
            notes: "Injection of vector layer and altered amount text",
          },
          {
            revisionNumber: 3,
            offset: 482190,
            length: 171300,
            objectCount: 6,
            hasPrevTrailer: true,
            notes: "Simulated stamp signature and re-saving with raster design suite",
          },
        ],
        totalObjects: 48,
        orphanObjectsCount: 4,
        streamCount: 18,
        hasEmbeddedJavascript: false,
        hasSuspiciousActions: false,
        isLinearized: false,
        trailerIdMismatch: true,
        trailerOriginalId: "a1c49f87e912b001a1c49f87e912b001",
        trailerCurrentId: "99ff4820bcde1100aa778844ee110022",
        objects: [
          {
            id: 1,
            gen: 0,
            type: "Catalog",
            offset: 104,
            length: 82,
            isStream: false,
            rawSnippet: "<< /Type /Catalog /Pages 2 0 R /Metadata 12 0 R >>",
          },
          {
            id: 7,
            gen: 0,
            type: "Image",
            offset: 14200,
            length: 64200,
            isStream: true,
            filter: "/DCTDecode",
            isSuspicious: true,
            suspicionReason: "Digital stamp overlaid with disparate JPEG quantization matrix",
            rawSnippet: "<< /Type /XObject /Subtype /Image /Width 420 /Height 180 /ColorSpace /DeviceRGB /Filter /DCTDecode >>",
          },
          {
            id: 28,
            gen: 0,
            type: "Page",
            offset: 189200,
            length: 420,
            isStream: false,
            isSuspicious: true,
            suspicionReason: "Content stream replacement in incremental revision #2",
            rawSnippet: "<< /Type /Page /Parent 2 0 R /Contents 29 0 R /Resources << /Font 30 0 R >> >>",
          },
          {
            id: 42,
            gen: 0,
            type: "Metadata",
            offset: 412000,
            length: 3200,
            isStream: true,
            isSuspicious: true,
            suspicionReason: "XMP Toolkit reports Adobe Photoshop 24.1 (Windows)",
            rawSnippet: "<< /Type /Metadata /Subtype /XML /Length 3150 >> stream <x:xmpmeta...Adobe Photoshop...",
          },
        ],
        rawTrailerText:
          "trailer << /Size 52 /Root 1 0 R /Info 6 0 R /Prev 310890 /ID [<a1c49f87e912b001><99ff4820bcde1100>] >>",
      },
      metadatos: {
        metadatos:
          "Creator: SAP ERP Billing Engine v4.2\nProducer: Adobe Photoshop 24.1.0 (Windows)\nCreateDate: 2026-02-14 09:12:00\nModDate: 2026-08-20 18:44:12\n⚠️ Software Alert: Manipulation tool fingerprint detected: \"Photoshop\".\n⚠️ Discrepancy: Modification executed 188 days after original creation date.",
        title: "Invoice_TECH_4092_Final",
        author: "Billing Department",
        creator: "SAP ERP Billing Engine v4.2",
        producer: "Adobe Photoshop 24.1.0 (Windows)",
        createDate: "2026-02-14 09:12:00",
        modifyDate: "2026-08-20 18:44:12",
        metadataDate: "2026-08-20 18:44:12",
        xmpToolkit: "Adobe XMP Core 9.1-c002",
        softwareFingerprint: "Adobe Photoshop (Vector/Raster Composition)",
        discrepanciaTemporal: true,
        discrepanciaDetalle: "The file was edited more than 6 months later using Adobe Photoshop.",
        producerMismatch: true,
        producerDetails: "Original creator is an enterprise ERP system, but final producer is Adobe Photoshop.",
        rawXmp: `<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:pdf="http://ns.adobe.com/pdf/1.3/">
      <xmp:CreatorTool>SAP ERP Billing Engine v4.2</xmp:CreatorTool>
      <pdf:Producer>Adobe Photoshop 24.1.0 (Windows)</pdf:Producer>
      <xmp:CreateDate>2026-02-14T09:12:00Z</xmp:CreateDate>
      <xmp:ModifyDate>2026-08-20T18:44:12Z</xmp:ModifyDate>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>`,
      },
      imagenes: {
        imagenes: [
          {
            id: "img-7",
            name: "corporate_digital_seal.png",
            width: 420,
            height: 180,
            colorspace: "RGB",
            meanBrightness: 142.8,
            compression: "JPEG (/DCTDecode)",
            elaScore: 84,
            isSuspicious: true,
            suspicionReason: "Elevated ELA (84%). The seal edges exhibit distinct JPEG error levels compared to document background.",
          },
          {
            id: "img-18",
            name: "corporate_logo.png",
            width: 300,
            height: 100,
            colorspace: "RGB",
            meanBrightness: 110.2,
            compression: "ZIP/PNG (/FlateDecode)",
            elaScore: 18,
            isSuspicious: false,
          },
        ],
        totalImages: 2,
        suspiciousImagesCount: 1,
        hasLayerOverlay: true,
        hasMismatchedCompression: true,
        detectedBarcodes: ["QR-INVOICE-INVALID-SIGN-4092"],
      },
      benford: {
        benford: "⚠️ Critical deviation detected (MAD: 0.0248). Amount distribution violates Benford's Law (2BL - Mebane).",
        totalNumbersAnalyzed: 38,
        chiSquare: 28.64,
        pValue: 0.0008,
        mad: 0.0248,
        madStatus: "NON_CONFORMING",
        firstDigitStats: [
          { digit: 1, actualCount: 6, actualFreq: 15.79, expectedFreq: 30.1, zScore: -2.71, isAnomaly: true },
          { digit: 2, actualCount: 3, actualFreq: 7.89, expectedFreq: 17.61, zScore: -1.72, isAnomaly: false },
          { digit: 3, actualCount: 4, actualFreq: 10.53, expectedFreq: 12.49, zScore: -0.38, isAnomaly: false },
          { digit: 4, actualCount: 5, actualFreq: 13.16, expectedFreq: 9.69, zScore: 0.74, isAnomaly: false },
          { digit: 5, actualCount: 11, actualFreq: 28.95, expectedFreq: 7.92, zScore: 4.88, isAnomaly: true },
          { digit: 6, actualCount: 2, actualFreq: 5.26, expectedFreq: 6.7, zScore: -0.37, isAnomaly: false },
          { digit: 7, actualCount: 2, actualFreq: 5.26, expectedFreq: 5.8, zScore: -0.15, isAnomaly: false },
          { digit: 8, actualCount: 1, actualFreq: 2.63, expectedFreq: 5.12, zScore: -0.71, isAnomaly: false },
          { digit: 9, actualCount: 4, actualFreq: 10.53, expectedFreq: 4.58, zScore: 1.78, isAnomaly: false },
        ],
        secondDigitStats: [
          { digit: 0, actualCount: 14, actualFreq: 36.84, expectedFreq: 11.97, zScore: 4.75, isAnomaly: true },
          { digit: 1, actualCount: 2, actualFreq: 5.26, expectedFreq: 11.39, zScore: -1.21, isAnomaly: false },
          { digit: 2, actualCount: 3, actualFreq: 7.89, expectedFreq: 10.88, zScore: -0.61, isAnomaly: false },
          { digit: 3, actualCount: 1, actualFreq: 2.63, expectedFreq: 10.43, zScore: -1.61, isAnomaly: false },
          { digit: 4, actualCount: 2, actualFreq: 5.26, expectedFreq: 10.03, zScore: -1.0, isAnomaly: false },
          { digit: 5, actualCount: 10, actualFreq: 26.32, expectedFreq: 9.67, zScore: 3.51, isAnomaly: true },
          { digit: 6, actualCount: 2, actualFreq: 5.26, expectedFreq: 9.35, zScore: -0.89, isAnomaly: false },
          { digit: 7, actualCount: 1, actualFreq: 2.63, expectedFreq: 9.05, zScore: -1.41, isAnomaly: false },
          { digit: 8, actualCount: 1, actualFreq: 2.63, expectedFreq: 8.78, zScore: -1.37, isAnomaly: false },
          { digit: 9, actualCount: 2, actualFreq: 5.26, expectedFreq: 8.53, zScore: -0.74, isAnomaly: false },
        ],
        suspiciousNumbers: [
          { value: 14500, rawText: "$14,500.00", reason: "Inflated total sum with anomalous digit 5 frequency" },
          { value: 5000, rawText: "$5,000.00", reason: "Excessively round fabricated amount" },
          { value: 2500, rawText: "$2,500.00", reason: "Round estimate number in support line item" },
        ],
        lawApplied: "BOTH",
      },
      cicatrices: [
        {
          id: "c-1",
          category: "ESTRUCTURA",
          severity: "CRITICA",
          title: "XREF Corruption & 3 Incremental Revisions",
          description: "The trailer references objects beyond the base table (/Size 52 vs 48 declared).",
          evidence: "3 independent %%EOF markers with chained /Prev pointers.",
          technicalTrace: "qpdf --check: reported number of objects mismatch",
        },
        {
          id: "c-2",
          category: "METADATOS",
          severity: "ALTA",
          title: "Adobe Photoshop Fingerprint on Official Invoice",
          description: "Invoice originally generated by SAP ERP was reopened and re-saved in Photoshop.",
          evidence: "Producer: Adobe Photoshop 24.1.0 (Windows), ModDate 188 days after CreateDate.",
          technicalTrace: "ExifTool / XMP Schema xmp:CreatorTool vs pdf:Producer delta",
        },
        {
          id: "c-3",
          category: "BENFORD",
          severity: "ALTA",
          title: "2BL Anomaly on Digits 0 & 5 (Fabricated Values)",
          description: "Unnatural frequency of amounts ending in 00 and 50 (36.8% in 0 vs 11.9% expected).",
          evidence: "Chi-Square = 28.64, MAD = 0.0248 (Status: NON_CONFORMING).",
          technicalTrace: "Benford 2BL Goodness-of-fit Z-Score > 4.5",
        },
        {
          id: "c-4",
          category: "IMAGENES",
          severity: "MEDIA",
          title: "ELA Inconsistency in Digital Seal",
          description: "Corporate seal exhibits distinct JPEG compression levels compared to base vector layer.",
          evidence: "Image ID 7 ELA Score: 84% (deviation > 60%).",
          technicalTrace: "ImageMagick / DCT quant matrix mismatch",
        },
      ],
      rawMarkdownReport: `# 📜 ANDRETAKER REPORT — BABAYAGA CORE VERDICT
**Analyzed File:** Tech_Invoice_4092_Tampered.pdf
**Analysis Date:** 2026-08-27 14:15:22
**Forensic Risk Score:** 88/100 [TAMPERED]

---

## 🔍 FORENSIC TELEMETRY FINDINGS
### Structure (XREF)
- **Corrupt XREF:** YES (reported number of objects mismatch)
- **Incremental Revisions:** 3 revisions
- **Trailer ID:** Discrepancy between original and current ID

### Metadata
Creator: SAP ERP Billing Engine v4.2
Producer: Adobe Photoshop 24.1.0 (Windows)
CreateDate: 2026-02-14 09:12:00
ModDate: 2026-08-20 18:44:12

### Images & Layers
- **Extracted Count:** 2
- **Suspicious Images (ELA):** 1 (Overlaid digital seal)

### Benford's Law Analysis (2BL - Mebane)
- **Verdict:** ⚠️ Critical deviation (MAD: 0.0248).
- **Suspicious Numbers:** $14,500.00, $5,000.00

---

## 🧠 EXPERT VERDICT
⚠️ Structural and metadata scars detected. The file has been manipulated.

*Expert Assessment: Conclusive evidence of graphic manipulation and structural re-saving with Adobe Photoshop.*`,
    },
  },
  {
    id: "case-bank-statement",
    name: "Bank Account Statement (Altered Balance)",
    badge: "TAMPERED - RISK 94%",
    verdict: "ALTERADO",
    riskScore: 94,
    description:
      "Monthly bank statement where the closing credit balance was manipulated. Features a critical time paradox (ModDate 14 months before CreateDate) and injected JavaScript streams.",
    tamperVector: "Time Paradox + /JS Stream Injection + Benford Non-Conforming",
    data: {
      id: "rep-case-2",
      fileName: "Private_Bank_Statement_2026.pdf",
      analyzedAt: "2026-08-27 14:10:05",
      fileSizeBytes: 612800,
      sha256: "88fbc1023a4901ee7790bcf4231899a1100223445566778899aabbccddeeff00",
      veredictoFinal: "ALTERADO",
      veredictoTexto: "⚠️ Structural and metadata scars detected. The file has been manipulated.",
      riesgoScore: 94,
      estructura: {
        XREF_corrupta: true,
        detalle: "/JavaScript stream detected alongside 2 orphan objects lacking active XREF entries.",
        pdfVersion: "1.7",
        fileSizeBytes: 612800,
        hashSha256: "88fbc1023a4901ee7790bcf4231899a1100223445566778899aabbccddeeff00",
        incrementalRevisionsCount: 2,
        revisions: [
          { revisionNumber: 1, offset: 390000, length: 390000, objectCount: 24, hasPrevTrailer: false, notes: "Automated Banking Generation" },
          { revisionNumber: 2, offset: 612800, length: 222800, objectCount: 8, hasPrevTrailer: true, notes: "Script injection and fraudulent balance insertion" },
        ],
        totalObjects: 32,
        orphanObjectsCount: 2,
        streamCount: 14,
        hasEmbeddedJavascript: true,
        hasSuspiciousActions: true,
        isLinearized: false,
        trailerIdMismatch: true,
        objects: [
          { id: 14, gen: 0, type: "Unknown", offset: 420000, length: 580, isStream: true, isSuspicious: true, suspicionReason: "/JavaScript stream used to hide underlying text layers" },
        ],
      },
      metadatos: {
        metadatos:
          "Creator: CoreBanking PDF Generator v8\nProducer: iText 5.5.13\nCreateDate: 2026-07-01 10:00:00\nModDate: 2025-05-12 14:20:00\n⚠️ Discrepancy: Critical time paradox: Modification timestamp precedes creation timestamp.",
        title: "Account_Statement_July2026",
        author: "International Private Bank",
        creator: "CoreBanking PDF Generator v8",
        producer: "iText 5.5.13",
        createDate: "2026-07-01 10:00:00",
        modifyDate: "2025-05-12 14:20:00",
        discrepanciaTemporal: true,
        discrepanciaDetalle: "Time paradox: Modified in 2025 but created in 2026.",
        producerMismatch: true,
        producerDetails: "Standard banking reporting engine was overwritten using iText library.",
      },
      imagenes: {
        imagenes: [],
        totalImages: 0,
        suspiciousImagesCount: 0,
        hasLayerOverlay: false,
        hasMismatchedCompression: false,
        detectedBarcodes: [],
      },
      benford: {
        benford: "⚠️ Critical Benford 2BL violation (MAD: 0.0312). Extreme concentration of synthetic figures.",
        totalNumbersAnalyzed: 52,
        chiSquare: 34.12,
        pValue: 0.0001,
        mad: 0.0312,
        madStatus: "NON_CONFORMING",
        firstDigitStats: [
          { digit: 1, actualCount: 8, actualFreq: 15.38, expectedFreq: 30.1, zScore: -2.31, isAnomaly: true },
          { digit: 2, actualCount: 4, actualFreq: 7.69, expectedFreq: 17.61, zScore: -1.87, isAnomaly: false },
          { digit: 3, actualCount: 5, actualFreq: 9.62, expectedFreq: 12.49, zScore: -0.62, isAnomaly: false },
          { digit: 4, actualCount: 6, actualFreq: 11.54, expectedFreq: 9.69, zScore: 0.45, isAnomaly: false },
          { digit: 5, actualCount: 7, actualFreq: 13.46, expectedFreq: 7.92, zScore: 1.49, isAnomaly: false },
          { digit: 6, actualCount: 3, actualFreq: 5.77, expectedFreq: 6.7, zScore: -0.27, isAnomaly: false },
          { digit: 7, actualCount: 4, actualFreq: 7.69, expectedFreq: 5.8, zScore: 0.58, isAnomaly: false },
          { digit: 8, actualCount: 5, actualFreq: 9.62, expectedFreq: 5.12, zScore: 1.48, isAnomaly: false },
          { digit: 9, actualCount: 10, actualFreq: 19.23, expectedFreq: 4.58, zScore: 5.06, isAnomaly: true },
        ],
        secondDigitStats: [
          { digit: 0, actualCount: 18, actualFreq: 34.62, expectedFreq: 11.97, zScore: 5.02, isAnomaly: true },
          { digit: 9, actualCount: 12, actualFreq: 23.08, expectedFreq: 8.53, zScore: 3.76, isAnomaly: true },
        ],
        suspiciousNumbers: [
          { value: 99000, rawText: "$99,000.00", reason: "Fictitious balance with repeating digit 9 pattern" },
          { value: 95000, rawText: "$95,000.00", reason: "Fabricated round number incongruent with transaction logs" },
        ],
        lawApplied: "BOTH",
      },
      cicatrices: [
        {
          id: "cb-1",
          category: "CRONOLOGÍA",
          severity: "CRITICA",
          title: "Retroactive Time Paradox",
          description: "Modification date (ModDate: May 2025) is 14 months prior to creation date (CreateDate: July 2026).",
          evidence: "ModDate: 2025-05-12 vs CreateDate: 2026-07-01",
          technicalTrace: "ExifTool / InfoDict Timestamp Delta Analyzer",
        },
        {
          id: "cb-2",
          category: "ESTRUCTURA",
          severity: "CRITICA",
          title: "Hidden JavaScript Code in Object Stream",
          description: "Object #14 contains dynamic /JS commands to alter visual layer rendering.",
          evidence: "Object 14 0 obj /Type /Action /S /JavaScript",
          technicalTrace: "qpdf byte stream inspector",
        },
      ],
      rawMarkdownReport: `# 📜 ANDRETAKER REPORT — BABAYAGA CORE VERDICT
**File:** Private_Bank_Statement_2026.pdf
**Verdict:** ⚠️ Structural and metadata scars detected. The file has been manipulated. (Risk 94%)`,
    },
  },
  {
    id: "case-clean-contract",
    name: "Certified Notarial Deed (Authentic Document)",
    badge: "CLEAN - RISK 4%",
    verdict: "LIMPIO",
    riskScore: 4,
    description:
      "Public notarial contract digitally signed with X.509 certificate. Single-pass linear XREF structure with perfectly synchronized timestamps.",
    tamperVector: "None — Cryptographic & Structural Integrity Verified",
    data: {
      id: "rep-case-3",
      fileName: "Certified_Notarial_Contract_2026.pdf",
      analyzedAt: "2026-08-27 14:05:00",
      fileSizeBytes: 320400,
      sha256: "33aabbccddee11223344556677889900aabbccddeeff00112233445566778899",
      veredictoFinal: "LIMPIO",
      veredictoTexto: "✅ The file appears clean. Single-pass structure and metadata pass all forensic tests.",
      riesgoScore: 4,
      estructura: {
        XREF_corrupta: false,
        detalle: "Standard single-pass XREF structure. Validated XREF table without orphan objects or size mismatches.",
        pdfVersion: "1.7",
        fileSizeBytes: 320400,
        hashSha256: "33aabbccddee11223344556677889900aabbccddeeff00112233445566778899",
        incrementalRevisionsCount: 1,
        revisions: [
          { revisionNumber: 1, offset: 320400, length: 320400, objectCount: 22, hasPrevTrailer: false, notes: "Single Certified Digital Signature" },
        ],
        totalObjects: 22,
        orphanObjectsCount: 0,
        streamCount: 8,
        hasEmbeddedJavascript: false,
        hasSuspiciousActions: false,
        isLinearized: true,
        trailerIdMismatch: false,
        objects: [],
      },
      metadatos: {
        metadatos:
          "Creator: Notary Public Digital Suite v3\nProducer: Adobe PDF Library 15.0\nCreateDate: 2026-06-10 11:30:00\nModDate: 2026-06-10 11:30:15\n✅ Perfect temporal integrity: 15-second delta between creation and digital signature.",
        title: "Public_Deed_RealEstate_8842",
        author: "Notary Public Bar Association",
        creator: "Notary Public Digital Suite v3",
        producer: "Adobe PDF Library 15.0",
        createDate: "2026-06-10 11:30:00",
        modifyDate: "2026-06-10 11:30:15",
        discrepanciaTemporal: false,
        producerMismatch: false,
      },
      imagenes: {
        imagenes: [
          {
            id: "img-1",
            name: "notarial_vector_signature.png",
            width: 500,
            height: 200,
            colorspace: "Grayscale",
            meanBrightness: 130.0,
            compression: "ZIP/PNG (/FlateDecode)",
            elaScore: 12,
            isSuspicious: false,
          },
        ],
        totalImages: 1,
        suspiciousImagesCount: 0,
        hasLayerOverlay: false,
        hasMismatchedCompression: false,
        detectedBarcodes: ["QR-NOTARIA-OFICIAL-VALID-2026"],
      },
      benford: {
        benford: "✅ Excellent statistical conformity (MAD: 0.0042). Natural 1BL/2BL distribution.",
        totalNumbersAnalyzed: 45,
        chiSquare: 4.12,
        pValue: 0.84,
        mad: 0.0042,
        madStatus: "CONFORMING",
        firstDigitStats: [
          { digit: 1, actualCount: 14, actualFreq: 31.11, expectedFreq: 30.1, zScore: 0.15, isAnomaly: false },
          { digit: 2, actualCount: 8, actualFreq: 17.78, expectedFreq: 17.61, zScore: 0.03, isAnomaly: false },
          { digit: 3, actualCount: 6, actualFreq: 13.33, expectedFreq: 12.49, zScore: 0.17, isAnomaly: false },
          { digit: 4, actualCount: 4, actualFreq: 8.89, expectedFreq: 9.69, zScore: -0.18, isAnomaly: false },
          { digit: 5, actualCount: 4, actualFreq: 8.89, expectedFreq: 7.92, zScore: 0.24, isAnomaly: false },
          { digit: 6, actualCount: 3, actualFreq: 6.67, expectedFreq: 6.7, zScore: -0.01, isAnomaly: false },
          { digit: 7, actualCount: 2, actualFreq: 4.44, expectedFreq: 5.8, zScore: -0.39, isAnomaly: false },
          { digit: 8, actualCount: 2, actualFreq: 4.44, expectedFreq: 5.12, zScore: -0.21, isAnomaly: false },
          { digit: 9, actualCount: 2, actualFreq: 4.44, expectedFreq: 4.58, zScore: -0.05, isAnomaly: false },
        ],
        secondDigitStats: [],
        suspiciousNumbers: [],
        lawApplied: "BOTH",
      },
      cicatrices: [],
      rawMarkdownReport: `# 📜 ANDRETAKER REPORT — BABAYAGA CORE VERDICT
**File:** Certified_Notarial_Contract_2026.pdf
**Verdict:** ✅ The file appears clean. Single-pass structure and metadata pass all forensic tests. (Risk 4%)`,
    },
  },
  {
    id: "case-tax-certificate",
    name: "Forged Tax Clearance Certificate (Altered QR & Seal)",
    badge: "SUSPICIOUS - RISK 72%",
    verdict: "ALTERADO",
    riskScore: 72,
    description:
      "Official government tax clearance certificate edited with Canva to falsify solvency status. The QR code redirects to a spoofed clone domain and the stamp exhibits high ELA deviation.",
    tamperVector: "Canva PDF Exporter + QR Inconsistency + Stamp ELA 76%",
    data: {
      id: "rep-case-4",
      fileName: "Tax_Clearance_Certificate_Forged.pdf",
      analyzedAt: "2026-08-27 13:50:11",
      fileSizeBytes: 524100,
      sha256: "9911223344556677889900aabbccddeeff0011223344556677889900aabbccdd",
      veredictoFinal: "ALTERADO",
      veredictoTexto: "⚠️ Structural and metadata scars detected. The file has been manipulated.",
      riesgoScore: 72,
      estructura: {
        XREF_corrupta: false,
        detalle: "Structure repackaged by web exporter (Canva). Official tax authority X.509 signatures stripped.",
        pdfVersion: "1.5",
        fileSizeBytes: 524100,
        hashSha256: "9911223344556677889900aabbccddeeff0011223344556677889900aabbccdd",
        incrementalRevisionsCount: 1,
        revisions: [{ revisionNumber: 1, offset: 524100, length: 524100, objectCount: 36, hasPrevTrailer: false, notes: "Single Canva Export" }],
        totalObjects: 36,
        orphanObjectsCount: 0,
        streamCount: 16,
        hasEmbeddedJavascript: false,
        hasSuspiciousActions: false,
        isLinearized: false,
        trailerIdMismatch: false,
        objects: [],
      },
      metadatos: {
        metadatos:
          "Creator: Canva\nProducer: Skia/PDF m115 Google Docs\nCreateDate: 2026-08-24 16:10:00\nModDate: 2026-08-24 16:10:00\n⚠️ Software Alert: Graphic design software fingerprint detected: \"Canva\".",
        title: "Tax_Certificate_2026",
        author: "Individual Taxpayer",
        creator: "Canva",
        producer: "Skia/PDF m115",
        createDate: "2026-08-24 16:10:00",
        modifyDate: "2026-08-24 16:10:00",
        discrepanciaTemporal: false,
        producerMismatch: true,
        producerDetails: "Official tax document was assembled in Canva rather than the tax administration secure server.",
      },
      imagenes: {
        imagenes: [
          {
            id: "img-sello",
            name: "tax_authority_approved_seal.png",
            width: 320,
            height: 320,
            colorspace: "RGB",
            meanBrightness: 155.0,
            compression: "JPEG (/DCTDecode)",
            elaScore: 76,
            isSuspicious: true,
            suspicionReason: "Elevated ELA (76%). Inconsistent compression matrix compared to page text background.",
          },
          {
            id: "img-qr",
            name: "tax_validation_qr.png",
            width: 200,
            height: 200,
            colorspace: "Grayscale",
            meanBrightness: 80.0,
            compression: "PNG (/FlateDecode)",
            elaScore: 22,
            isSuspicious: true,
            suspicionReason: "The QR code redirects to an unverified spoofed clone domain (afip-gov-ar.validation-auth.com)",
            decodedQrOrBarcode: "https://afip-gov-ar.validation-auth.com/verify?id=99281",
          },
        ],
        totalImages: 2,
        suspiciousImagesCount: 2,
        hasLayerOverlay: true,
        hasMismatchedCompression: true,
        detectedBarcodes: ["https://afip-gov-ar.validation-auth.com/verify?id=99281"],
      },
      benford: {
        benford: "✅ Acceptable statistical conformity on tax amounts.",
        totalNumbersAnalyzed: 18,
        chiSquare: 8.2,
        pValue: 0.41,
        mad: 0.0084,
        madStatus: "ACCEPTABLE",
        firstDigitStats: [],
        secondDigitStats: [],
        suspiciousNumbers: [],
        lawApplied: "BOTH",
      },
      cicatrices: [
        {
          id: "ct-1",
          category: "METADATOS",
          severity: "ALTA",
          title: "Canva Fingerprint on Government Certificate",
          description: "Tax clearance certificate supposedly issued by revenue authority contains Creator: Canva.",
          evidence: "CreatorTool: Canva, Producer: Skia/PDF m115",
          technicalTrace: "ExifTool / Producer Fingerprint Analysis",
        },
        {
          id: "ct-2",
          category: "IMAGENES",
          severity: "ALTA",
          title: "QR Code Points to Spoofed Domain",
          description: "Decoded QR payload leads to an external spoofed domain instead of the government portal.",
          evidence: "URL: https://afip-gov-ar.validation-auth.com/verify?id=99281",
          technicalTrace: "zbarimg QR Code payload analysis",
        },
      ],
      rawMarkdownReport: `# 📜 ANDRETAKER REPORT — BABAYAGA CORE VERDICT
**File:** Tax_Clearance_Certificate_Forged.pdf
**Verdict:** ⚠️ Structural and metadata scars detected. The file has been manipulated. (Risk 72%)`,
    },
  },
];
