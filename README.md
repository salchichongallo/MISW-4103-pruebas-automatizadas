## Desarrollo local

Dependencias:

- Node.js >= v18
- Docker >= v25

Instalación:

1. Clonar repositorio
2. Instalar dependencias: `npm install`
3. Iniciar Ghost: `docker-compose up ghost -d`

Los credenciales de panel de administración están en los archivos `e2e-cypress/cypress.env.json` y `e2e-kraken/properties.json`

Para correr Cypress: `npm run cy:open`

Para correr Kraken: `npm run kraken:test`

### Recursos de interés

- [Referencia de API para Webdriver (browser para Kraken):](https://v7.webdriver.io/docs/api/browser/$)
- [Ejemplos de Kraken](https://github.com/TheSoftwareDesignLab/Kraken/tree/gh-pages/examples)
- [Steps integrados en Kraken](https://github.com/TheSoftwareDesignLab/Kraken/blob/master/src/steps/web.ts)
