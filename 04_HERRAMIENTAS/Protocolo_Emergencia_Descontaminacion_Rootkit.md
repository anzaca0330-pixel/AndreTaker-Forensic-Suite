# PROTOCOLO DE EMERGENCIA: RECUPERACIÓN DE DISPOSITIVOS CON INFECCIÓN DE CORE (ROOTKIT / BOOTKIT)
**Autora:** Andrea Zabala Cárcamo (AnZaCa / AndreTaker)  
**Clasificación:** Procedimiento Pericial DFIR de Descontaminación de Nivel 0

---

## 1. PRINCIPIO FUNDAMENTAL FORENSE
Cuando un dispositivo sufre una intrusión a nivel de Kernel, Rootkit o Bootkit (capas `/system`, `/vendor`, `/boot` o UEFI EEPROM):
> **UN RESTABLECIMIENTO DE FÁBRICA CONVENCIONAL NO ELIMINA EL MALWARE.**  
El restablecimiento solo formatea `/data` y `/cache`. El código malicioso reside en las particiones del sistema protegidas contra escritura estándar. La única vía segura es el **Reflasheo Total de Particiones Físicas (Stock ROM original de fábrica)**.

---

## 2. DISPOSITIVOS SAMSUNG (ODIN / HEIMDALL)

### A. Descarga de Firmware Limpio Oficial (Sin intermediarios de dudosa procedencia)
1. Instala `samloader` o `Bifrost` (Python / CLI):
   ```bash
   pip install samloader
   samloader -m SM-MODELO -r CSC download -O .
   samloader -m SM-MODELO -r CSC decrypt -v VERSION -i ARCHIVO.enc4 -o firmware.zip
   ```
   *(Reemplaza `SM-MODELO` ej. `SM-G998B` y `CSC` ej. `CHO`, `COO`, `TPA`)*.

### B. Flasheo mediante ODIN (Windows):
1. **Poner el teléfono en Modo Download:**
   - Apaga el teléfono por completo.
   - Mantén presionados `Bajar Volumen + Subir Volumen` y conecta el cable USB a la PC.
   - En la pantalla turquesa de advertencia, presiona `Subir Volumen` una vez.
2. **Asignación estricta de ranuras en Odin v3.14+:**
   - **BL:** Carga `BL_...` (Bootloader original).
   - **AP:** Carga `AP_...` (Imagen del sistema, kernel y recovery).
   - **CP:** Carga `CP_...` (Firmware del módem y radio base).
   - **CSC:** Carga `CSC_...` (**⚠️ NUNCA USES HOME_CSC**). El CSC regular reformatea la tabla de particiones físicas (PIT) y aniquila cualquier persistencia en almacenamiento.
3. Haz clic en **START** y espera a que el recuadro marque **PASS!** en verde.

### C. Flasheo mediante HEIMDALL (Linux Nativo):
```bash
# Detectar dispositivo
sudo heimdall detect

# Flasheo completo con tabla PIT
sudo heimdall flash --resume --PIT s1.pit \
  --BOOTLOADER sboot.bin \
  --PARAM param.bin \
  --BOOT boot.img \
  --RECOVERY recovery.img \
  --SYSTEM system.img \
  --USERDATA userdata.img \
  --CACHE cache.img \
  --RADIO modem.bin
```

---

## 3. DISPOSITIVOS XIAOMI / REDMI / POCO (FASTBOOT MODE)

1. Descarga la **Fastboot ROM oficial** (archivo con extensión `.tgz`, no el archivo `.zip` de Recovery).
2. **Entrar en Modo Fastboot:**
   - Apaga el teléfono. Mantén presionados `Bajar Volumen + Botón Encendido` hasta ver el logo Fastboot.
3. **Ejecución del script de limpieza radical:**
   - Descomprime el archivo `.tgz` con 7-Zip.
   - En Linux:
     ```bash
     chmod +x flash_all.sh
     ./flash_all.sh
     ```
   - En Windows: Ejecuta con doble clic `flash_all.bat`.
   - **Regla:** Nunca uses `flash_all_except_storage.bat` si hay sospecha de rootkit.

---

## 4. GOOGLE PIXEL & DISPOSITIVOS CON FASTBOOT ESTÁNDAR

1. Abre Chrome o Brave y navega a la herramienta oficial WebUSB de Google:  
   `https://flash.android.com`
2. Conecta el Pixel en modo Fastboot (`Bajar Volumen + Encendido`).
3. Marca las opciones:
   - ✅ **Wipe Device** (Formateo completo de fábrica).
   - ✅ **Force Flash all Partitions** (Sobrescribe slots A y B).
   - ✅ **Lock Bootloader** (Restaura el Android Verified Boot criptográfico).

---

## 5. COMPUTADOR PC / LAPTOP (UEFI BOOTKIT / ROOTKIT)

1. **Reflasheo de Firmware UEFI/BIOS en Frío:**
   - Descarga la BIOS oficial desde la web del fabricante en una máquina limpia.
   - Graba la ROM en un pendrive FAT32 y utiliza el botón de emergencia **BIOS FlashBack** o el actualizador UEFI interno (ej. Q-Flash, EZ-Flash, Lenovo BIOS Update) para sobrescribir la EEPROM física del chip.
2. **Sobrescritura Cero del Sector de Arranque (Zero-Fill MBR/GPT):**
   - Arranca con un Live USB de Linux (Ubuntu/Debian) y corre:
     ```bash
     # Destruir las tablas de partición y sectores iniciales donde se oculta el bootkit
     sudo dd if=/dev/zero of=/dev/nvme0n1 bs=1M count=100 && sync
     ```
   - Reinstala el sistema operativo desde cero mediante medio USB verificado.

---

## 6. MEDIDAS OBLIGATORIAS POST-RESTAURACIÓN

- ❌ **NO RESTAURAR BACKUPS DE APPS:** Restaura únicamente archivos planos (fotos, PDFs, texto).
- 🔑 **CAMBIAR TODAS LAS CONTRASEÑAS INMEDIATAMENTE:** Desde una red y dispositivo no comprometidos.
- 🛡️ **VERIFICAR BLOQUEO DE BOOTLOADER:** Garantiza que el kernel verificado no admita inyecciones.
