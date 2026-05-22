# 🖥️ EP2 Frontend — Innovatech Chile

Frontend de la aplicación Innovatech Chile, desarrollado con React + Vite + TypeScript y desplegado en AWS EC2 mediante contenedores Docker.

## 🛠️ Tecnologías
- React 18 + Vite + TypeScript
- Nginx (servidor de archivos estáticos)
- Docker con multi-stage build
- GitHub Actions (CI/CD)
- Amazon ECR (registro de imágenes)

## 🚀 Cómo ejecutar localmente

### Prerrequisitos
- Node.js 20+
- Docker Desktop

### Sin Docker
```bash
npm install
npm run dev
# Abrir http://localhost:5173
```

### Con Docker
```bash
docker compose up --build
# Abrir http://localhost
```

## 🐳 Estructura Docker

El `Dockerfile` usa **multi-stage build**:
- **Stage 1 (builder):** Compila la app React
- **Stage 2 (nginx):** Sirve los archivos estáticos con Nginx

El usuario del contenedor es **no root** por seguridad (principio de mínimo privilegio).

## 🔄 Pipeline CI/CD

El pipeline se activa con `push` en la rama `deploy`:
1. Build de la imagen Docker con la URL del backend inyectada
2. Push a Amazon ECR
3. SSH a la instancia EC2 pública
4. Pull de la nueva imagen y reinicio del contenedor

## 🌐 Acceso
- **URL pública:** http://IP_EC2_FRONTEND
- **Puerto:** 80

## 📁 Variables de entorno
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend | `http://IP_BACKEND:3001` |
