# Pruebas automatizadas

## Integrantes del equipo - MISW-4103

| Nombre                | Correo institucional       |
| --------------------- | -------------------------- |
| Jaime Gallo           | j.gallom@uniandes.edu.co   |
| Jhorman Galindo       | j.galindop@uniandes.edu.co |
| Leiner Barrios        | lj.barrios@uniandes.edu.co |
| Luis Alejandro Bogotá | l.bogotab@uniandes.edu.co  |

## Instrucciones de instalación y ejecución

### Estructura de archivos

```txt
├── README.md
├── .env.example  -------------------> Variables de entorno
├── e2e-cypress  --------------------> Aplicación de Cypress
│   ├── cypress
│   │   └── e2e  --------------------> Escenarios de pruebas de Cypress
│   │       └── pages  --------------> Page Objects
│   ├── cypress.env.json  -----------> Variables de entorno
│   └── cypress.example.json  -------> Ejemplo de variables de entorno
├── e2e-kraken  ---------------------> Aplicación de Kraken
│   └── features  -------------------> Escenarios de pruebas de Kraken
│       └── web
│           ├── page-objects  -------> Page Objects
│           └── step_definitions  ---> Definición de pasos
└── package.json  -------------------> Definición de librerías
```

### Requisitos previos

Antes de ejecutar las pruebas, asegúrese de tener instalado lo siguiente:

- [Node.js 18 o superior](https://nodejs.org/en/download)
- Google Chrome

### Instalación

1. Descargue el proyecto

Clone este repositorio o descargue el archivo ZIP adjunto en un release.

2. Configure las variables de entorno

Renombre el archivo `.env.example` por `.env` y coloque la siguiente información en él:

```
GHOST_EMAIL=john@doe.com
GHOST_PASSWORD=Secret321.
GHOST_BASE_URL=http://ec2-54-91-89-99.compute-1.amazonaws.com:2368
GHOST_BASE_URL_3429=http://ec2-54-158-234-189.compute-1.amazonaws.com:2368
```

3.  Navegue hasta el directorio del proyecto y ejecute el siguiente comando para instalar las dependencias:

```bash
npm install
```

### Ejecución de pruebas E2E

Nota: Ejecute los siguientes comandos como administrador.

#### Ghost v5.82.2

Todos los escenarios están escritos para esta versión de Ghost. En la siguiente sección encontrará las instrucciones para ejecutar los 10 escenarios con Ghost v3.42.9

Para Kraken, ejecute: `npm run kraken:test`

Y para Cypress, ejecute: `npm run test:cypress`

#### Pruebas con Ghost v3.42.9

Pruebas Ghost v3.42.9:

- Para modo headless ejecute: `npm run test:cypress:3429`
- Para abrir la consla de Cypress: `npm run cy:open:3429`

Nota: Si modifica las variables de entorno, asegúrese de ejecutar el siguiente comando para actualizar los valores en ambas aplicaciones: `npm run postinstall`

---

#### Recursos de interés

- [Referencia de API para Webdriver (browser para Kraken):](https://v7.webdriver.io/docs/api/browser/$)
- [Ejemplos de Kraken](https://github.com/TheSoftwareDesignLab/Kraken/tree/gh-pages/examples)
- [Steps integrados en Kraken](https://github.com/TheSoftwareDesignLab/Kraken/blob/master/src/steps/web.ts)
