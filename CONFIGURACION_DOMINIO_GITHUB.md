# 🌐 GUÍA DE CONFIGURACIÓN: DOMINIO PROPIO VÍA GITHUB PAGES / ACTIONS

Para desplegar esta suite forense (**AndreTaker — BabaYaga Core**) con tu propio dominio (ej. `forensics.tudominio.com` o `tudominio.com`) utilizando **GitHub Pages**, sigue estos 3 pasos:

---

### PASO 1: Subir el Código a tu Repositorio de GitHub
1. Si aún no has subido los cambios, haz un `git push` a tu repositorio de GitHub (ej. `AndreTaker---AnZaCa-Rep` en rama `main` o `master`).
2. El flujo automatizado `.github/workflows/deploy.yml` ya está configurado y compilará la suite automáticamente en cada `push`.

---

### PASO 2: Configurar el Dominio Propio en GitHub
1. Entra a tu repositorio en GitHub: `https://github.com/tu-usuario/tu-repositorio`
2. Ve a **Settings (Configuración)** ⚙️ $\rightarrow$ **Pages** (en el menú lateral izquierdo).
3. En la sección **"Build and deployment"**:
   - Source: Selecciona **GitHub Actions**.
4. En la sección **"Custom domain" (Dominio personalizado)**:
   - Escribe tu dominio (ejemplo: `andretaker.tudominio.com` o `tudominio.com`).
   - Haz clic en **Save (Guardar)**.
   - Activa la casilla **"Enforce HTTPS"** (se habilitará tras validarse los DNS).

---

### PASO 3: Configurar los Registros DNS en tu Proveedor de Dominio

Entra al panel de control de tu registrador de dominio (Cloudflare, Namecheap, GoDaddy, etc.) y añade estos registros según tu caso:

#### CASO A: Si usas un Subdominio (Recomendado, ej: `andretaker.tudominio.com` o `vault.tudominio.com`):
* **Tipo**: `CNAME`
* **Nombre / Host**: `andretaker` (o `vault`)
* **Valor / Destino**: `tu-usuario.github.io`
* **TTL**: Automático (o 300)

#### CASO B: Si usas el Dominio Raíz Principal (ej: `tudominio.com`):
Crea los 4 registros `A` oficiales de GitHub Pages apuntando a las siguientes IPs:
* **Tipo**: `A` | **Host**: `@` | **Valor**: `185.199.108.153`
* **Tipo**: `A` | **Host**: `@` | **Valor**: `185.199.109.153`
* **Tipo**: `A` | **Host**: `@` | **Valor**: `185.199.110.153`
* **Tipo**: `A` | **Host**: `@` | **Valor**: `185.199.111.153`

Y un registro `CNAME` para el alias www:
* **Tipo**: `CNAME` | **Host**: `www` | **Valor**: `tu-usuario.github.io`

---

### 🛡️ RECOMENDACIÓN DE SEGURIDAD (CLOUDFLARE)
Si gestionas tu DNS en Cloudflare:
1. Pon el registro en modo **DNS Only** (nube gris) mientras GitHub emite el certificado SSL.
2. Una vez que GitHub Pages confirme el certificado, puedes cambiarlo a **Proxied** (nube naranja ☁️) con modo SSL en **Full (Strict)** para activar el WAF y protección Anti-DDoS.
