# 🖼️ Unsplash Collage Generator

Aplicación **100% frontend** construida con **Astro** que permite explorar imágenes desde Unsplash, seleccionar hasta 4, generar collages con distintos layouts y descargarlos como imagen — todo **sin backend**.

> Diseñada como proyecto de **portfolio frontend moderno**, priorizando performance, UX y arquitectura limpia.

---

## 🚀 Demo

👉 https://unsplash-collage-astro.vercel.app/

<img width="700" height="397" alt="image" src="https://github.com/user-attachments/assets/af5ee2af-9fa9-4e03-9aef-f734f653e566" />


---

## 🧠 ¿Qué hace esta aplicación? (visión general)

Desde el punto de vista del usuario:

1. Explora imágenes (desde Unsplash)
2. Selecciona hasta 4 imágenes
3. Genera un collage con distintos layouts
4. Descarga el collage como imagen
5. Guarda collages localmente y los visualiza en una galería

Desde el punto de vista técnico:

- Todo ocurre **en el navegador**
- No hay backend, base de datos ni autenticación
- El estado se maneja con **IndexedDB**
- Astro renderiza HTML estático y solo hidrata lo necesario (Islands)

---

## 🧱 Tecnologías utilizadas

### Core

- **Astro** – HTML-first, Island Architecture
- **TypeScript** – tipado estricto
- **CSS moderno** – Flexbox, Grid, responsive design
- **Lucide Icons** – iconografía SVG ligera

### APIs & librerías

- **Unsplash API** – búsqueda y exploración de imágenes
- **html-to-image** – exportar el collage como PNG
- **IndexedDB** – persistencia local

### Filosofía

- ❌ No React / Vue / Angular
- ❌ No backend
- ❌ No frameworks pesados
- ✅ Performance-first
- ✅ UX cuidada
- ✅ Código legible y escalable

---

## 🧩 Arquitectura Frontend

### Astro + Island Architecture

- **HTML estático por defecto**
- **Islands** solo donde hay interactividad:
  - Sidebar (mobile drawer)
  - Gallery (fetch + selección)
  - Collage (layout + descarga)
  - Gallery page (collages guardados)

Esto reduce:

- JavaScript enviado al cliente
- Tiempo de carga
- Complejidad innecesaria

<img width="524" height="1036" alt="ChatGPT Image Jan 2, 2026, 06_52_26 PM" src="https://github.com/user-attachments/assets/be270b79-6c49-4147-bc47-2c5e48e9b481" />

---

### Estructura del proyecto

```txt
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.astro
│   │   └── Header.astro
│   ├── gallery/
│   └── collage/
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro        # Explore
│   ├── collage.astro      # Generate collage
│   └── gallery.astro      # Saved collages
├── islands/
│   ├── gallery.ts
│   ├── collage.ts
│   └── sidebar.ts
├── lib/
│   ├── unsplash.ts        # API client
│   ├── collage-state.ts   # state & persistence
│   └── gallery-store.ts
└── styles/
```

---

## 🔄 Flujo de datos (simplificado)

1. **Explore**
   - Fetch a Unsplash API
   - Render grid de imágenes
   - Selección limitada a 4

2. **Collage**
   - Se lee el estado desde LocalStorage
   - Se renderiza el layout seleccionado
   - Se exporta a PNG con `html-to-image`

3. **Gallery**
   - Collages guardados como Base64 / Blob
   - Persistidos localmente
   - Renderizados sin backend

---

## 🎨 UX & UI

- 🌙 UI oscura con paleta violeta + cyan
- 📱 Mobile-first
- 🧭 Sidebar:
  - Desktop: fijo
  - Mobile: drawer con overlay

- ✨ Microinteracciones:
  - Hover states
  - Transiciones suaves
  - Estados disabled / empty

- ♿ Accesibilidad básica:
  - Alt en imágenes
  - Estados visuales claros
  - Navegación simple

---

## 📦 Persistencia local (sin backend)

Se usan dos estrategias según el caso:

- **IndexedDB**
  - Collages exportados
  - Mayor capacidad
  - Mejor rendimiento para blobs/Base64

Esto permite:

- Simular una “galería personal”
- Mantener el proyecto simple
- Evitar infraestructura innecesaria

---

## 🛠️ Instalación

### Requisitos previos

- **Node.js** ≥ 18
- **yarn** - **npm** o **pnpm**
- Una **API Key de Unsplash**

---

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/unsplash-collage
cd unsplash-collage
```

---

### 2️⃣ Instalar dependencias

```bash
yarn install
```

---

### 3️⃣ Variables de entorno

Crea un archivo `.env`:

```env
PUBLIC_UNSPLASH_ACCESS_KEY=tu_api_key_aqui
```

> Astro expone solo las variables que empiezan con `PUBLIC_`

---

### 4️⃣ Ejecutar en desarrollo

```bash
yarn dev
```

Abrir en el navegador:

```
http://localhost:4321
```

---

## 🏗️ Build de producción

```bash
yarn build
yarn preview
```

---

## 🎯 Objetivo del proyecto

Este proyecto fue creado para demostrar:

- Arquitectura frontend moderna sin frameworks pesados
- Uso correcto de Astro e Islands
- Buen criterio de UX/UI
- Integración con APIs públicas
- Manejo de estado sin backend
- Pensamiento orientado a performance y simplicidad

---

## Autores ✒️

- **Andrés Coello Goyes** - _SOFTWARE ENGINEER_ - [Andres Coello](https://linktr.ee/gandrescoello)

#### 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://andres-coello-goyes.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrescoellogoyes/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/acoellogoyes)

## Expresiones de Gratitud 🎁

- Pasate por mi perfil para ver algun otro proyecto 📢
- Desarrollemos alguna app juntos, puedes escribirme en mis redes.
- Muchas gracias por pasarte por este proyecto 🤓.

---

⌨️ con ❤️ por [Andres Coello Goyes](https://linktr.ee/gandrescoello) 😊

<img width="400" height="400" alt="1764558900283" src="https://github.com/user-attachments/assets/cde88968-7856-49ec-bdb1-53a82bf9caa3" />

