Perfecto 👌
Te voy a generar un **README listo para GitHub / portfolio**, pensado con **doble lectura**:

* 🧠 **Técnica** → para frontend engineers / reviewers
* 👀 **No tan técnica** → para reclutadores y perfiles no técnicos

Usa un tono profesional, claro y vende bien tus decisiones de arquitectura.

---

# 🖼️ Unsplash Collage Generator

Aplicación **100% frontend** construida con **Astro** que permite explorar imágenes desde Unsplash, seleccionar hasta 4, generar collages con distintos layouts y descargarlos como imagen — todo **sin backend**.

> Diseñada como proyecto de **portfolio frontend moderno**, priorizando performance, UX y arquitectura limpia.

---

## 🚀 Demo

👉 *(Aquí puedes poner el link cuando lo publiques en Vercel / Netlify)*

---

## 🧠 ¿Qué hace esta aplicación? (visión general)

Desde el punto de vista del usuario:

1. Explora imágenes (desde Unsplash)
2. Selecciona hasta 4 imágenes
3. Genera un collage con distintos layouts
4. Descarga el collage como imagen
5. Guarda collages localmente y los visualiza en una galería

Desde el punto de vista técnico:

* Todo ocurre **en el navegador**
* No hay backend, base de datos ni autenticación
* El estado se maneja con **LocalStorage / IndexedDB**
* Astro renderiza HTML estático y solo hidrata lo necesario (Islands)

---

## 🧱 Tecnologías utilizadas

### Core

* **Astro** – HTML-first, Island Architecture
* **TypeScript** – tipado estricto
* **CSS moderno** – Flexbox, Grid, responsive design
* **Lucide Icons** – iconografía SVG ligera

### APIs & librerías

* **Unsplash API** – búsqueda y exploración de imágenes
* **html-to-image** – exportar el collage como PNG
* **LocalStorage / IndexedDB** – persistencia local

### Filosofía

* ❌ No React / Vue / Angular
* ❌ No backend
* ❌ No frameworks pesados
* ✅ Performance-first
* ✅ UX cuidada
* ✅ Código legible y escalable

---

## 🧩 Arquitectura Frontend

### Astro + Island Architecture

* **HTML estático por defecto**
* **Islands** solo donde hay interactividad:

  * Sidebar (mobile drawer)
  * Gallery (fetch + selección)
  * Collage (layout + descarga)
  * Gallery page (collages guardados)

Esto reduce:

* JavaScript enviado al cliente
* Tiempo de carga
* Complejidad innecesaria

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

   * Fetch a Unsplash API
   * Render grid de imágenes
   * Selección limitada a 4

2. **Collage**

   * Se lee el estado desde LocalStorage
   * Se renderiza el layout seleccionado
   * Se exporta a PNG con `html-to-image`

3. **Gallery**

   * Collages guardados como Base64 / Blob
   * Persistidos localmente
   * Renderizados sin backend

---

## 🎨 UX & UI

* 🌙 UI oscura con paleta violeta + cyan
* 📱 Mobile-first
* 🧭 Sidebar:

  * Desktop: fijo
  * Mobile: drawer con overlay
* ✨ Microinteracciones:

  * Hover states
  * Transiciones suaves
  * Estados disabled / empty
* ♿ Accesibilidad básica:

  * Alt en imágenes
  * Estados visuales claros
  * Navegación simple

---

## 📦 Persistencia local (sin backend)

Se usan dos estrategias según el caso:

* **LocalStorage**

  * Estado del collage actual
  * Selección de imágenes

* **IndexedDB**

  * Collages exportados
  * Mayor capacidad
  * Mejor rendimiento para blobs/Base64

Esto permite:

* Simular una “galería personal”
* Mantener el proyecto simple
* Evitar infraestructura innecesaria

---

## 🛠️ Instalación

### Requisitos previos

* **Node.js** ≥ 18
* **npm** o **pnpm**
* Una **API Key de Unsplash**

---

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/unsplash-collage
cd unsplash-collage
```

---

### 2️⃣ Instalar dependencias

```bash
npm install
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
npm run dev
```

Abrir en el navegador:

```
http://localhost:4321
```

---

## 🏗️ Build de producción

```bash
npm run build
npm run preview
```

---

## 🎯 Objetivo del proyecto

Este proyecto fue creado para demostrar:

* Arquitectura frontend moderna sin frameworks pesados
* Uso correcto de Astro e Islands
* Buen criterio de UX/UI
* Integración con APIs públicas
* Manejo de estado sin backend
* Pensamiento orientado a performance y simplicidad

---

## 👤 Autor

**Andrés Coello**
Software Engineer

* 🌐 Portfolio: [https://andres-coello-goyes.vercel.app](https://andres-coello-goyes.vercel.app)
* 💼 LinkedIn: *(opcional)*
* 🧑‍💻 GitHub: *(opcional)*

---

Si quieres, en el siguiente mensaje puedo:

* Ajustarlo a **inglés 100%**
* Hacer una versión **más corta para recruiters**
* O ayudarte a escribir el **README pitch** que aparece arriba del repo ⭐
