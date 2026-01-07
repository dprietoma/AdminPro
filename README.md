# Admmin pro Front-end

Estes proyecto esta generado con [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## 📚 Levantar el proyecto en local

Run `ng serve` para un servidor de desarrollo. Navegar a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambia alguno de los archivos de origen.

## 📚 Instalar dependencias 

Se debe correr el comando `npm i`  para instalar las de pendencias

## 📚 Estructura del proyecto

El proyecto está organizado siguiendo una arquitectura modular de Angular, separando responsabilidades por dominio, funcionalidad y reutilización de componentes.

 📁 app/

Contiene el núcleo de la aplicación.

* auth/
Módulo de autenticación. Incluye las vistas de login y registro, así como su enrutamiento (auth-routing.module.ts) y configuración del módulo (auth.module.ts).

* components/
Componentes reutilizables y desacoplados de las páginas principales (ej. gráficos, contadores, widgets).

* guards/
Guards de Angular para proteger rutas (ej. auth.guard.ts), controlando el acceso según el estado de autenticación.

* interfaces/
Definición de interfaces TypeScript para tipar formularios y estructuras de datos (login, registro, etc.).

* models/
Modelos de dominio de la aplicación (por ejemplo, usuario.model.ts).

* pages/
Módulos y componentes que representan las páginas principales del sistema (dashboard, gráficas, progreso, promesas, rxjs, configuración de cuenta, etc.), con su propio routing (pages-routing.module.ts).

* services/
Servicios de Angular encargados de la lógica de negocio y comunicación con el backend (usuarios, sidebar, settings, etc.).

* nopagefound/
Componente para manejar rutas inexistentes (404).

📁 shared/

Componentes compartidos a nivel global en la aplicación.

* Header

* Sidebar

* Breadcrumbs

Incluye su propio módulo (shared.module.ts) para facilitar la reutilización.

📁 assets/

Recursos estáticos de la aplicación:

* Imágenes

* Estilos CSS / SCSS

Plugins y scripts externos

📁 environments/

Configuración de entornos:

* environment.ts (desarrollo)

* environment.prod.ts (producción)
 

📁 Archivos principales

* app-routing.module.ts: configuración global de rutas

* app.module.ts: módulo raíz de la aplicación

* main.ts: punto de entrada de Angular

* styles.scss: estilos globales

## 📚 Temas trabajados

🧩 Componentes y comunicación en Angular

* Uso de @Input, @Output y @ViewChild

* Creación de componentes reutilizables con funcionalidades específicas

* Referencias a elementos HTML desde componentes

* Uso de atributos personalizados

* Manipulación del DOM con JavaScript puro (ej. foco en elementos)

* Integración de gráficas como componentes personalizados

🧱 Módulos, servicios y estado visual

* Creación de un módulo exclusivo para servicios

* Ejecución de scripts JavaScript dentro de archivos TypeScript

* Uso de LocalStorage para persistencia de datos

* Cambio dinámico de estilos CSS

* Creación de un componente de ajustes de tema

* Tips de JavaScript aplicados en TypeScript

* Preparación del servicio del Sidebar para un menú dinámico basado en el backend

🔁 Programación asíncrona y RxJS

* Introducción conceptual a Promesas y Observables

* Uso de funciones que retornan promesas

* Creación manual de Observables

* Uso de operadores RxJS:

  * retry

  * map

  * filter

  * next

* Funciones que retornan Observables

* Creación de un componente de seguimiento de la página actual

* Lectura de parámetros de configuración de rutas usando Observables

Manejo dinámico de:

* Meta tags

* Título de la página

🔐 Autenticación y seguridad

Creación de una aplicación en Google Developer Console

Generación de:

* Client ID

* Client Secret (servidor)

* Implementación de login básico con Google (pruebas)

* Generación de Token desde el Front-end

* Validación del Token en el Back-end

Implementación de:

* Login tradicional (usuario/contraseña)

* Login con Google

* Uso de LocalStorage para almacenar tokens

* Protección básica de rutas con Guards

* Implementación de Logout

🌐 Integración Front-end / Back-end

* Conexión entre Angular (Front-end) y Node.js (Back-end) para autenticación

* Consumo de endpoints desde el Front

* Identificación y ajuste de endpoints faltantes

* Uso de Queries y modelos de datos

* Definición de Modelos en el Front-end

🧰 Herramientas y utilidades utilizadas

* Angular

* RxJS

* Google Identity Services

* Node.js / Express

* LocalStorage

* SweetAlert para mensajes y notificaciones

