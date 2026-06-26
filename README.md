# MOKI 
## 📖 Introducción

Este proyecto es una aplicación móvil para la **gestión de rentas de motos**, desarrollada con un enfoque moderno y escalable. La plataforma permite a los usuarios:

- 🔐 **Iniciar sesión** y **crear cuentas** de forma segura.
- 🏠 **Visualizar motos disponibles** para renta.
- 📋 **Gestionar de rante de motos** activas y completadas.
- 💳 **Pasarela de pago** permitiendo cobrar por el uso de una moto. 

El proyecto está construido con **Angular 20** e **Ionic 8**, utilizando **TailwindCSS** para estilos modernos y rápidos.



## 🛠️ Tecnologías del Backend


| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | v20+ | Entorno de ejecución |
| **NestJS** | v10+ | Framework backend (TypeScript) |
| **Swagger** | - | Documentación de API |

> **Nota:** El backend se comunicará con el frontend a través de una **API REST** con endpoints protegidos.

---

## 🎨 Tecnologías del Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Angular** | 20.3.25 | Framework principal |
| **Ionic** | 8.8.12 | Componentes y navegación móvil |
| **TailwindCSS** | 4.3.1 | Estilos utilitarios y diseño |
| **TypeScript** | 5.9.0 | Tipado estático y seguridad |
| **RxJS** | 7.8.0 | Programación reactiva |
| **Capacitor** | 8.4.1 | Acceso a nativo y build móvil |
| **ESLint** | 9.16.0 | Linting y calidad de código |

## 🛠️ Configuración del proyecto
> **Nota:** Se recomineda copiar y pegar en orden los comandos para instalar las tecnologias de desarrollo.

### Requisitos previos
- Node.js v20+
- npm v10+ 

### 📋 Comandos para copiar y pegar en una terminal 
> **Nota:** La letra i es una aprevación de install y el -g es para descargar el paquete en global para usarlo en donde sea. 

- npm i -g @angular/cli
- npm i -g gitmoji-cli
- npm i -g @ionic/cli
- npm i -g @nestjs/cli

> Se tendra que descargar el androind studio para poder ejecutar el proyecto de front-end y descargar el SDK de java que recomineda instalar androind studio

>**Nota**: Para subir un commit en Git se va a usar el paquete gitmoji-cli. Para ejecutarlo, se debe escribir en la terminal el comando: **gitmoji -c** Al ejecutarlo, aparecerá una lista de emojis con su respectiva descripción. Se debe elegir el emoji que más se acerque a la acción que se realizó en el proyecto. Luego, se presiona **Enter** y se escribe el título del commit. Al presionar nuevamente **Enter**, aparecerá la opción de agregar un párrafo con más detalles. Se escribe el párrafo (opcional) y se presiona **Enter** nuevamente para crear el commit con el emoji seleccionado.

