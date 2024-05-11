const playwright = require('playwright');
const compareImages = require('resemblejs/compareImages');
const config = require('./config.json');
const fs = require('fs');

// Ruta al archivo JSON
let ghost3429 = '../e2e-cypress/reports/cypress-steps-ghost3429.json';
let ghost5822 = '../e2e-cypress/reports/cypress-steps-ghost5822.json';

const { browsers, options } = config;

async function executeTest() {
  let datetime = new Date().toISOString().replace(/:/g,".");
  if (!fs.existsSync(`./results/${datetime}`)){
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

  for (let i = 0; i < 9; i++) {
    let stepsForGhost3 = ghost3429Report[i].steps;
    let stepsForGhost5 = filteredGhost5822Report[i].steps;

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

        fs.writeFileSync(
          `./results/${ghost3429Report[i].scenario.split('\\')[ghost3429Report[i].scenario.split.length - 1]}-${stepsForGhost3[j].name}.png`,
          data.getBuffer(),
        );
      }
    }
  }

  fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, resultInfo));
  fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

  return resultInfo;
}

(async () => console.log(await executeTest()))();

function browser(b, info) {
  return `<div class=" browser" id="test0">
  <div class=" btitle">
      <h2>Browser: ${b}</h2>
      <p>Data: ${JSON.stringify(info)}</p>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Reference</span>
      <img class="img2" src="before-${b}.png" id="refImage" label="Reference">
    </div>
    <div class="imgcontainer">
      <span class="imgname">Test</span>
      <img class="img2" src="after-${b}.png" id="testImage" label="Test">
    </div>
  </div>
  <div class="imgline">
    <div class="imgcontainer">
      <span class="imgname">Diff</span>
      <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
    </div>
  </div>
</div>`;
}

function createReport(datetime, resInfo) {
  return `
  <html>
      <head>
          <title> VRT Report </title>
          <link href="index.css" type="text/css" rel="stylesheet">
      </head>
      <body>
          <h1>Report for
               <a href="${config.url}"> ${config.url}</a>
          </h1>
          <p>Executed: ${datetime}</p>
          <div id="visualizer">
              ${config.browsers.map(b => browser(b, resInfo[b]))}
          </div>
      </body>
  </html>`;
}
