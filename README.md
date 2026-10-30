# Cara Sur — Productora Editorial & Audiovisual

Sitio web oficial y catálogo de producciones de **Cara Sur**, productora independiente dedicada a la creación editorial, el cine documental y el ciclo de entrevistas y pensamiento **"Pensar la Época"**.

---

## 🔒 Arquitectura de Seguridad & Panel Admin Local

Por directriz estricta de **ciberseguridad**:
- El panel de administración **no se expone a internet** ni forma parte de ningún despliegue público en la nube.
- El servidor de administración (`server/admin-server.ts`) escucha **exclusivamente en `127.0.0.1:3001`**.
- Cuenta con defensas activas:
  - **Filtro de IP estricto**: Rechazo automático de cualquier conexión que no provenga de localhost (`127.0.0.1` / `::1`).
  - **Protección contra DNS Rebinding**: Verificación del header `Host`.
  - **Protección Anti-CSRF**: Validación de `Origin`, `Referer` y token criptográfico `x-admin-csrf`.
  - **Escritura atómica**: Los cambios se escriben en un archivo temporal antes de reemplazar `src/data/content.json` para evitar corrupción de datos.

---

## 🚀 Puesta en Marcha Local

### 1. Iniciar el entorno completo de desarrollo:
```bash
npm run dev
```
Al ejecutar `npm run dev`, Vite levantará el frontend en `http://localhost:3000` e iniciará automáticamente el servidor local de administración en `http://127.0.0.1:3001` (si no estuviera activo).

### 2. O por separado (opcional):
- **Frontend solo**: `npm run dev`
- **Servidor Admin independiente**: `npm run admin`
- **Ambos en paralelo tradicional**: `npm run dev:all`

### 3. Acceso al Admin:
Ingresá a `http://localhost:3000` y hacé clic en el botón superior **`[ ⚙️ Admin Local ]`** o navegá a `http://localhost:3000/#admin`.

---

## 📁 Estructura del Proyecto

- `public/`: Assets estáticos y logos en video (`cara-sur.mp4`, `pensar-la-epoca.mp4`).
- `src/data/content.json`: Fuente única de la verdad con todos los textos editables de la página.
- `src/components/`:
  - `Header.tsx`: Cabezal y navegación con logo en video de Cara Sur.
  - `Hero.tsx`: Portada institucional.
  - `EditorialSection.tsx`: Catálogo de publicaciones y ensayos.
  - `AudiovisualSection.tsx`: Catálogo de obras y películas.
  - `PensarLaEpocaSection.tsx`: Ciclo de entrevistas con logo en video.
  - `ContactSection.tsx`: Canales de comunicación directa.
  - `AdminView.tsx`: Interfaz de edición confinada a localhost.
- `server/admin-server.ts`: Servidor seguro en Express para persistir cambios en local.
