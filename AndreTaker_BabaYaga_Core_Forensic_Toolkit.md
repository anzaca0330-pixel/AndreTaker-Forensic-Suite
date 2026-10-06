# AndreTaker — BabaYaga Core Forensic Toolkit
**Documento Maestro de Arquitectura, Especificación Pericial y Manifiesto de Cadena de Custodia**

---

| Metadato Pericial | Detalle de Registro |
| :--- | :--- |
| **Identificador del Toolkit** | `AndreTaker — BabaYaga Core Forensic Suite` |
| **Versión** | `1.0.0 (Release de Preservación Digital)` |
| **Investigadora Principal** | **Andrea Zabala Cárcamo (AnZaCa / AndreTaker)** |
| **Especialidad Pericial** | Digital Forensics and Incident Response (DFIR) & Reverse Engineering |
| **Red de Custodia Criptográfica** | Red Descentralizada de Testigos Digitales (75.000) |
| **Volumen de Evidencia Preservada** | >147.000 documentos E-14 (136 GB núcleo / >400 GB repositorio general) |
| **Licencia de Código y Evidencia** | Apache 2.0 / Open Forensic Science |
| **Estándares Aplicados** | ISO/IEC 27037 (Gestión de Evidencia Digital), NIST SP 800-86 |
| **Inspiración de Desarrollo** | *El sueño del 18 de marzo de 2026 (BabaYaga: la que ve en la penumbra, desentierra la verdad oculta y desmonta los vectores sintéticos)* |

---

## 1. 📌 Propósito y Definición del Ecosistema

**AndreTaker — BabaYaga Core** es un ecosistema forense multicapa de grado pericial desarrollado para el análisis automatizado, desensamblado binario, escrutinio estadístico y detección de manipulación documental en flujos masivos de formularios electorales en formato PDF (Actas E-14).

El toolkit combina análisis de bajo nivel de streams de objetos PDF con pruebas estadísticas avanzadas y visión computacional forense para descubrir vectores de alteración que resultan invisibles a simple vista durante la inspección superficial.

### Vectores Forenses Detectados:
1. **1-Bit Blind Masking & Flattening**: Inyección de capas sintéticas raster (`/Contents`) y máscaras monocromáticas de 1-bit por canal (`1bpc` / `DeviceGray`) superpuestas sobre el escaneo original para modificar cifras manuscritas preservando intacta la suma exterior.
2. **Cicatriz Estructural XREF**: Corrupción detectable en la tabla de referencias cruzadas mediante reconstrucción estricta con `qpdf` (15 objetos declarados en catálogo vs. 13 objetos presentes en el flujo binario original).
3. **Anomalías Cuánticas ELA**: Desajustes en niveles de error de compresión JPEG (Error Level Analysis) entre el fondo del formulario y las firmas o sellos superpuestos.
4. **Desviación de Ley de Benford (2BL - Walter Mebane)**: Ruptura del patrón natural de segundo dígito en series electorales ($p < 0.0001$), indicativo inequívoco de generación numérica artificial y varianza cero.

---

## 2. 🧠 Arquitectura Modular del Toolkit (`04_HERRAMIENTAS / 02_ANALISIS`)

El ecosistema opera mediante una suite modular orquestada por el motor central `babayaga_core.py`:

```
AndreTaker-BabaYaga-Core/
├── babayaga_core.py                 # Orquestador principal y pipeline pericial
├── 04_HERRAMIENTAS/
│   ├── detector_blind_masking.py    # Inspección de capas 1bpc, DeviceGray y streams /Contents
│   ├── analisis_xref.py             # Parser estructural qpdf, validación XREF 15 vs 13
│   ├── detector_1bit_flattening.py  # Análisis de compresión forzada, cuantización y ELA
│   ├── analisis_benford.py          # Cálculo de Benford 2BL (Mebane), chi-cuadrado y varianza
│   └── generador_informes.py        # Generador de dictámenes procesales en Markdown, JSON y PDF
└── firmas_criptograficas_sha256.txt # Registro inmutable de hashes SHA-256 de todas las actas
```

### Tabla de Responsabilidad Modular:

| Módulo | Función Pericial | Binarios y Librerías Nativas |
| :--- | :--- | :--- |
| `analisis_xref.py` | Detecta la cicatriz estructural XREF y objetos huérfanos/inyectados. | `qpdf --check`, `pdfdetach` |
| `detector_blind_masking.py` | Extrae y aísla capas de máscara `1bpc` y flujos de contenido vectorizados superpuestos. | `poppler-utils`, `pdfimages -list` |
| `detector_1bit_flattening.py` | Realiza Error Level Analysis (ELA) y detecta pérdida no homogénea de cuantización. | `imagemagick (identify)`, OpenCV |
| `analisis_benford.py` | Ejecuta la prueba de Benford para el 2° dígito (Mebane 2BL) y test de aleatoriedad. | `scipy.stats`, `numpy` |
| `generador_informes.py` | Produce el veredicto consolidado en 3 formatos de salida para distintas audiencias. | Jinja2, Pandoc |

---

## 3. 🎯 Matriz de Enrutamiento de Audiencias (Directriz de Triple Salida)

Para asegurar la máxima efectividad jurídica, técnica y social, todo análisis ejecutado por **AndreTaker — BabaYaga Core** genera salidas adaptadas a tres públicos independientes:

```
                      ┌──────────────────────────────────────┐
                      │    ANDRETAKER — BABAYAGA CORE       │
                      │       Análisis Forense E-14          │
                      └──────────────────┬───────────────────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         │                               │                               │
         ▼                               ▼                               ▼
┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
│   AUDIENCIA 1    │           │   AUDIENCIA 2    │           │   AUDIENCIA 3    │
│ TÉCNICO/PERICIAL │           │  LEGAL/JURÍDICO  │           │ CIUDADANO COMÚN  │
├──────────────────┤           ├──────────────────┤           ├──────────────────┤
│• Volcados Hex    │           │• Cadena Custodia │           │• Resumen simple  │
│• Tablas XREF raw │           │• ISO/IEC 27037   │           │• Antes / Después │
│• Test 2BL Mebane │           │• Dictamen formal │           │• Analogía visual │
│• Hashes SHA-256  │           │• Fe pública      │           │• Votos reales    │
└──────────────────┘           └──────────────────┘           └──────────────────┘
```

### Especificación por Audiencia:

1. **Audiencia 1: Técnico / Pericial (DFIR & Reverse Engineering)**
   - **Enfoque**: Riguroso, matemático, comandos reproducibles paso a paso, hashes SHA-256 exactos y volcados binarios.
   - **Salida**: Bitácora técnica completa, logs de `qpdf`, histogramas ELA y coeficientes de correlación estadística.

2. **Audiencia 2: Legal / Jurídico (Cadena de Custodia & Evidencia Admisible)**
   - **Enfoque**: Estructura procesal estricta fundamentada en los estándares ISO/IEC 27037 y NIST SP 800-86.
   - **Salida**: Dictamen pericial oficial con validez jurídica ante cortes nacionales e internacionales, firmas de los 75.000 testigos digitales y acreditación de alteración no consentida en la capa de transmisión.

3. **Audiencia 3: Ciudadano Común / Divulgación Pública (Claridad & Transparencia)**
   - **Enfoque**: Lenguaje claro, intuitivo y didáctico sin tecnicismos oscuros.
   - **Salida**: Comparativa visual "antes vs. después" del formulario E-14, infografías explicativas y la analogía del "vidrio transparente con números falsos colocado sobre el papel original".

---

## 4. 🔒 Cadena de Custodia y Preservación de Evidencia

1. **Testigos Digitales**: 75.000 observadores digitales distribuidos recolectaron y sellaron con hash SHA-256 los formularios E-14 inmediatamente tras su publicación inicial, evitando la sustitución silenciosa en los servidores centrales.
2. **Registro de Hashes**: Cada archivo procesado cuenta con su firma criptográfica registrada en `firmas_criptograficas_sha256.txt`.
3. **Inmutabilidad**: Toda modificación en un solo byte del archivo altera el hash SHA-256 resultante, evidenciando de manera inmediata e irrevocable la pérdida de integridad.

---

*Desarrollado y preservado por Andrea Zabala Cárcamo (AnZaCa / AndreTaker).*  
*Red de Custodia Criptográfica — Evidencia Criptográfica Inmutable.*
