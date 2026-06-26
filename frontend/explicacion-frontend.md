#  Frontend - Documentación del Proyecto

[![Angular](https://img.shields.io/badge/Angular-20-red?style=flat-square&logo=angular)](https://angular.io/)
[![Ionic](https://img.shields.io/badge/Ionic-8-blue?style=flat-square&logo=ionic)](https://ionicframework.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)


## 📖 Introducción

Esta carpeta contiene el **frontend** del proyecto de la aplicación de renta de motos. Está desarrollado con **Angular 20**, **Ionic 8** y **TailwindCSS**.

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos

Asegúrate de tener instalado lo siguiente:

- **Node.js** v20+
- **npm** v10+
- **Angular CLI** v20+ (instalado globalmente)

### Pasos para levantar el proyecto

```bash
# 1. Clonar el repositorio (si no lo has hecho)
git clone https://github.com/tu-usuario/proyecto-rentas.git
cd proyecto-rentas/frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar el servidor de desarrollo
npm run start
# o
ng serve

# 4. Abrir en el navegador
# http://localhost:4200

```
## Estrucutra de las carpetas y archivos

```bash
frontend/
├── src/
│   ├── app/
│   │   ├── auth/                       # Módulo de autenticación
│   │   │   ├── inicio-sesion/          # Página de login
│   │   │   │   ├── inicio-sesion.component.html
│   │   │   │   ├── inicio-sesion.component.scss
│   │   │   │   └── inicio-sesion.component.ts
│   │   │   └── crear-cuenta/           # Página de registro
│   │   │       ├── crear-cuenta.component.html
│   │   │       ├── crear-cuenta.component.scss
│   │   │       └── crear-cuenta.component.ts
│   │   │
│   │   ├── pages/                      # Páginas principales de la app
│   │   │   └── navbar/                 # Paginas de los tabs 
│   │   │       ├── tab-inicio/         # Pagina de inicio
│   │   │       ├── tab-mis-rentas/     # Pagina de mis rentas
│   │   │       └── tab-perfil/         # Pagina de perfil
│   │   │
│   │   ├── components/                 # Componentes de la aplicación
│   │   │   ├── layout/                 # Layout componentes que se repiten el mismo contendio.
│   │   │   └── shared/                 # Shared componentes individulaes (ej: btn, input y etc).
│   │   │
│   │   ├── layout/                     # Layouts globales
│   │   │   ├── auth-layout/            # Layout para páginas de autenticación
│   │   │   └── main-layout/            # Layout para páginas principales
│   │   │
│   │   ├── app.component.html          # Componente raíz (template)
│   │   ├── app.component.scss          # Estilos del componente raíz
│   │   ├── app.component.ts            # Lógica del componente raíz
│   │   └── app.routes.ts               # Configuración de rutas
│   │
│   ├── assets/                         # Archivos estáticos (imágenes, fuentes, etc.)
│   │   └── icon/                       # Iconos de la aplicación
│   │
│   ├── environments/                   # Configuración de entornos
│   │   ├── environment.ts              # Entorno de desarrollo
│   │   └── environment.prod.ts         # Entorno de producción
│   │
│   ├── theme/                          # Variables y temas de Ionic
│   │   └── variables.scss              # Variables CSS de Ionic
│   │
│   ├── global.scss                     # Estilos globales + TailwindCSS
│   ├── index.html                      # Página HTML principal
│   ├── main.ts                         # Punto de entrada de la aplicación
│   ├── polyfills.ts                    # Polyfills para compatibilidad
│   └── zone-flags.ts                   # Configuración de Zone.js
│
├── .browserslistrc                     # Configuración de navegadores soportados
├── .editorconfig                       # Configuración de formato de código
├── .eslintrc.json                      # Configuración de ESLint
├── .gitignore                          # Archivos ignorados por Git
├── .postcssrc.json                     # Configuración de PostCSS (Tailwind)
├── angular.json                        # Configuración de Angular CLI
├── ionic.config.json                   # Configuración de Ionic
├── karma.conf.js                       # Configuración de Karma (tests)
├── package.json                        # Dependencias y scripts
├── package-lock.json                   # Bloqueo de versiones de dependencias
├── tsconfig.json                       # Configuración base de TypeScript
├── tsconfig.app.json                   # Configuración de TypeScript para la app
└── tsconfig.spec.json                  # Configuración de TypeScript para tests
```

