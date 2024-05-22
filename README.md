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
```

3.  Navegue hasta el directorio del proyecto y ejecute el siguiente comando para instalar las dependencias:

```bash
npm install
```

### Ejecución de pruebas E2E

Nota: Ejecute los siguientes comandos como administrador.

#### Ghost v5.82.2

Todos los escenarios están escritos para esta versión de Ghost. En la siguiente sección encontrará las instrucciones para ejecutar los 10 escenarios con Ghost v3.42.9

Para Cypress, ejecute: `npm run test:cypress`

### Ejecución de pruebas de regresión visual

**NOTA: Antes de la ejecución de las pruebas de regresión visual, asegúrese de haber ejecutado las pruebas E2E con Cypress para cada versión de Ghost.**

Para ejecutar las pruebas de regresión visual, ejecute los siguientes comandos:

1. Generar reporte de escenarios en formato JSON

```
node e2e-cypress/src/collect-screenshots.js
```

2. Navegar a la carpeta `resemblejs` y ejecutar el siguiente comando:

```
npm install
```

3. Ejecutar las pruebas de regresión visual

```
node index.js
```

4. Una ves que tengamos el reporte generado con éxito, nos dirigimos a la siguiente ruta para ver el reporte en HTML:

```
resemblejs/results/
```

![image](https://github.com/salchichongallo/MISW-4103-pruebas-automatizadas/assets/157497216/817b4935-6243-4e3a-b823-08a56ea7232a)

5. Una vez tengas el reporte HTML creado, en Visutal Studio Code vas a instalar la extensión "Live Server" para poder visualizarlo ya que presenta errores de imagenes al visualizarlo en algunos navegadores.

![image](https://github.com/salchichongallo/MISW-4103-pruebas-automatizadas/assets/157497216/53b32bed-70d7-48ba-a47d-a281aff716b3)

6. Cuando ya tengamos la extensión instalada, damos click derecho sobre el archivo HTML y en la opción "Open with live Server" para poder vizualizar el reporte.

![image](https://github.com/salchichongallo/MISW-4103-pruebas-automatizadas/assets/157497216/a075fcc7-95e3-4822-a577-44818793469f)

7. Deberíamos ver algo como esto:

![image](https://github.com/salchichongallo/MISW-4103-pruebas-automatizadas/assets/157497216/84884241-8440-48bf-b262-335690865a3b)

---

#### Wiki semana 6

[Semana 6](https://github.com/salchichongallo/MISW-4103-pruebas-automatizadas/wiki/Semana-6)
