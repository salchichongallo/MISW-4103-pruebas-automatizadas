const playwright = require('playwright');
const compareImages = require('resemblejs/compareImages');
const config = require('./config.json');
const fs = require('fs');

// Ruta al archivo JSON
let ghost3429 = '../e2e-cypress/reports/cypress-steps-ghost3429.json';
let ghost5822 = '../e2e-cypress/reports/cypress-steps-ghost5822.json';

const { browsers, options } = config;

async function executeTest() {
  let datetime = new Date().toISOString().replace(/:/g, '.');
  if (!fs.existsSync(`./results/${datetime}`)) {
    fs.mkdirSync(`./results/${datetime}`, { recursive: true });
  }

  // Leer el archivo JSON de forma sincrónica
  let ghost3429Report = JSON.parse(fs.readFileSync(ghost3429, 'utf8'));
  let ghost5822Report = JSON.parse(fs.readFileSync(ghost5822, 'utf8'));

  let resultInfo = {};

  // Guardando nombre de escenarios de Ghost 3
  const scenariosNamesGhost3 = [];
  for (const scenarioObj of ghost3429Report) {
    let splittedPath = scenarioObj.scenario.split('\\');
    let scenarioName = splittedPath[splittedPath.length - 1];
    scenariosNamesGhost3.push(scenarioName);
  }

  // Filtrar los escenarios de Ghost 5822 en base a los de Ghost3
  let filteredGhost5822Report = ghost5822Report.filter(scenarioObj => {
    let splittedPath = scenarioObj.scenario.split('\\');
    let scenarioName = splittedPath[splittedPath.length - 1];
    return scenariosNamesGhost3.includes(scenarioName);
  });

  // Array de resultados por imagen
  let resultsPerImage = [];

  for (let i = 0; i < 9; i++) {
    let stepsForGhost3 = ghost3429Report[i].steps;
    let stepsForGhost5 = filteredGhost5822Report[i].steps;

    resultsPerImage.push({
      scenario: ghost3429Report[i].scenario,
      results: [],
    });

    for (let j = 0; j < stepsForGhost3.length; j++) {
      let pathGhost3 = stepsForGhost3[j]?.image;
      let pathGhost5 = stepsForGhost5[j]?.image;

      if (pathGhost3 && pathGhost5) {
        let image1 = fs.readFileSync(stepsForGhost3[j].image);
        let image2 = fs.readFileSync(stepsForGhost5[j].image);

        let data = await compareImages(image1, image2, options);

        // Guardar los resultados de la comparación
        resultInfo = {
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime,
        };

        let pathResult = `./results/${datetime}/${ghost3429Report[i].scenario.split('\\')[ghost3429Report[i].scenario.split.length - 1]}-${stepsForGhost3[j].name}.png`;
        pathGhost3 = pathGhost3.split('e2e-cypress')[1].replace(/\\/g, '/');
        pathGhost5 = pathGhost5.split('e2e-cypress')[1].replace(/\\/g, '/');

        resultsPerImage[i].results.push({
          name: stepsForGhost3[j].name,
          resultInfo: `/resemblejs/${pathResult}`,
          imageReference: `/e2e-cypress/${pathGhost3}`,
          imageTest: `/e2e-cypress/${pathGhost5}`,
          difference: data.misMatchPercentage,
        });

        fs.writeFileSync(pathResult, data.getBuffer());
      }
    }
  }

  fs.writeFileSync(
    `./results/${datetime}/report.html`,
    createReport(datetime, resultsPerImage),
  );
  fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

  return resultInfo;
}

(async () => console.log(await executeTest()))();

function createReport(datetime, resInfo) {
  return `
  <html>
      <head>
          <title> VRT Report </title>
          <link href="./index.css" type="text/css" rel="stylesheet">
      </head>
      <body>
          <h1>Report for 
               <a href="${config.url}">GHOST 3.42.9 -  ${config.url}</a>
          </h1>
          <p>Executed: ${datetime}</p>
          <div id="visualizer" style="
          position: relative;
          margin: 5px auto;
          padding: 10px 30px;
          background-color: #FAFAFA;
          box-shadow: 0 3px 6px 0 rgba(0,0,0,0.16);
          min-height: 40px;
          -webkit-break-inside: avoid;
          break-inside: avoid;
          ">
          <div>
          ${resInfo.map(
            (res, i) => `
          <h1>
            ${res.scenario.split('\\')[res.scenario.split('\\').length - 1]}
          </h1>
          <div class="result">
            ${res.results.map(
              (result, i) => `
            <h2>${result.name}</h2>
            <div style="display: flex; gap: 1rem">
              <div style="display: flex; flex-direction: column; gap: 1rem">
                <h3>Imagen - v3.42.9</h3>
                <img style="width: 100%; border: 1px solid gray" src="${result.imageReference}" class="image-reference" alt="Image reference" />
              </div>
              <div style="display: flex; flex-direction: column; gap: 1rem">
                <h3>Imagen - v5.82.22</h3>
                <img style="width: 100%; border: 1px solid gray" src="${result.imageTest}" class="image-test" alt="Image test" />
              </div>
            </div>
            <br/>
            <h3>Imagen - resultado de comparación</h3>
            <img style="width: 100%; border: 1px solid gray" src="${result.resultInfo}" class="image-diff" alt="Image difference" />
            <h2 class="percentage">Porcentaje de diferencia: ${result.difference}%</h2>
            <hr/>
            <br/>
            <br/>
            `
            )}
          </div>
          `
          )}
    </div>
          </div>
      </body>
  </html>`;
}
