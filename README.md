# ⚖️ AndreTaker — Forensic Suite (BaBaYaga Core v2.1)
**Multimodal DFIR Analysis, Binary Inspection, Benford 2BL Metrology & CyberDefense Command Center**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23188146.svg)](https://doi.org/10.5281/zenodo.23188146)
[![AI Studio Challenge](https://img.shields.io/badge/Google_AI_Studio-Competitor_Challenge-4285F4?logo=google&logoColor=white)](https://ai.studio/apps/67688420-f6da-4ea8-a7a0-c9d9048b0604)
[![Gemini](https://img.shields.io/badge/Powered_by-Gemini_Multimodal-orange?logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Digital Forensics](https://img.shields.io/badge/DFIR-ISO%2FIEC_27037-red.svg)](https://www.iso.org/standard/44381.html)
[![Handshake](https://img.shields.io/badge/Handshake-Verified_Submission-101820.svg)](#)

---

## 🌟 Resumen Ejecutivo / Overview (Google AI Studio & Handshake Challenge)

**AndreTaker — Forensic Suite (BaBaYaga Core)** es un sistema de grado pericial y contrainteligencia digital diseñado para auditar, desensamblar y verificar la autenticidad e integridad estructural de documentos complejos en formato PDF (con énfasis en flujos electorales y actas oficiales E-14), combinando metrología analítica de bajo nivel con el razonamiento multimodal de **Google Gemini**.

Desarrollado por la investigadora **Andrea Zabala Cárcamo (AnZaCa / AndreTaker)**. La génesis del ecosistema se remonta al sueño del **18 de marzo de 2026**, seguido por el hito electoral de primera vuelta en Colombia el **31 de mayo de 2026**, y el descubrimiento pericial crítico entre el **1 y el 6 de junio de 2026** (identificación de páginas deliberadamente en blanco y la técnica de *Blind Masking* o enmascaramiento ciego). Todo esto en el marco de la preservación de más de **147.000 documentos** y **>677 GB** de evidencia digital salvaguardada bajo estrictos estándares criptográficos **SHA-256**.

> 🏆 **Candidatura Destacada:** Proyecto presentado para el **Google AI Studio Challenge en Handshake**, demostrando el poder de la IA Generativa aplicada a la ciencia forense digital rigurosa (DFIR), la defensa de los derechos ciudadanos y la auditoría institucional independiente.

---

## 🔬 Núcleos Operativos de la Suite

La plataforma opera bajo una arquitectura desacoplada y multimodal de dos núcleos principales:

### 1. 🪓 Núcleo 1: Análisis Forense Documental & Metrología (Baba Yaga & Tycho Engine)
* **Inspección Binaria XREF:** Detección de deltas fantasma (+2), reescrituras superpuestas (`%EOF`), trailers adulterados e inyecciones `/FlateDecode`.
* **Matriz de Metadatos y Cronología:** Detección de cicatrices temporales, desfases en UTC y discrepancias de software de renderizado.
* **Análisis de Ley de Benford (2BL):** Verificación estadística de segundo dígito en conteos y tablas numéricas para identificar distribuciones artificiales.
* **Forense Visual (ELA / 1bpc):** Análisis de nivel de error (ELA) y verificación de máscaras de un solo bit por canal (1-bit-per-channel) para detectar superposición de capas y clonación de firmas/sellos.
* **Oráculo Pericial IA (Gemini):** Razonamiento automatizado para generar dictámenes técnicos adaptados a tres audiencias:
  1. *Especialistas Técnicos / DFIR.*
  2. *Fiscales, Tribunales y Jueces.*
  3. *Sociedad Civil y Prensa.*

### 2. 🛡️ Núcleo 2: Ciberseguridad & DFIR Ops (Antigravity & Shield)
* **Centro de Telemetría de Asedio:** Mapeo de incidentes de alta contención y mitigación de amenazas persistentes avanzadas (APT).
* **Protocolo Rootkit / Bootkit:** Guías de descontaminación de hardware, particiones UEFI y aislamiento perimetral.
* **Bóvedas Criptográficas:** Verificación de cadenas de custodia y acervos inmutables de testigos digitales descentralizados.

---

## 🛠️ Tecnologías y Arquitectura

* **Motor de IA:** Google Gemini API (`@google/genai`) con inferencia multimodal y prompts contextuales de alta fidelidad pericial.
* **Frontend:** React 19, TypeScript, Vite, TailwindCSS, Lucide Icons, Canvas Confetti.
* **Backend:** Express, Node.js / Bun.
* **Integración CI/CD:** GitHub Actions para compilación y despliegue automatizado en GitHub Pages (`.github/workflows/deploy.yml`).

---

## 🚀 Despliegue y Ejecución Local

### Prerrequisitos
* Node.js v20+ o Bun instalado.

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/anzaca0330-pixel/AndreTaker-Forensic-Suite.git
   cd AndreTaker-Forensic-Suite
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar credenciales (Zero-Leakage OpSec):**
   Copia el archivo de plantilla y añade tu clave de API de Gemini:
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local`:
   ```env
   GEMINI_API_KEY="tu_clave_de_gemini_aqui"
   ```
   *(El archivo `.env*` está rigurosamente ignorado por `.gitignore` y jamás será subido a repositorios públicos).*

4. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación:**
   Abre tu navegador en `http://localhost:5173`.

---

## 📜 Licencia y Atribución

Este proyecto está licenciado bajo la **Licencia Apache 2.0**. Consulta el archivo [LICENSE](LICENSE) para conocer los términos completos.

* **Fecha de Creación Original:** 2026 (Preservación Digital & Ecosistema AndreTaker / BaBaYaga Core).
* **Autor / Investigadora Principal:** Andrea Zabala Cárcamo (AnZaCa / AndreTaker) — Universidad de Phoenix.
* **Enlace Oficial en Google AI Studio:** [Ver App en AI Studio](https://ai.studio/apps/67688420-f6da-4ea8-a7a0-c9d9048b0604)
