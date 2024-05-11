const playwright = require('playwright');
const compareImages = require('resemblejs/compareImages');
const config = require('./config.json');
const fs = require('fs');

// Ruta al archivo JSON
let ghost3429 = '../e2e-cypress/reports/cypress-steps-ghost3429.json';
let ghost5822 = '../e2e-cypress/reports/cypress-steps-ghost5822.json';

const { browsers, options } = config;

async function executeTest() {
  // Leer el archivo JSON de forma sincrónica
  let ghost3429Report = JSON.parse(fs.readFileSync(ghost3429, 'utf8'));
  let ghost5822Report = JSON.parse(fs.readFileSync(ghost5822, 'utf8'));

  let resultInfo = {};

  for (let i = 0; i < ghost3429Report.length; i++) {
    let scenario = ghost3429Report[i].scenario;
    for (let j = 0; j < ghost3429Report[i].steps.length; j++) {
      let step = ghost3429Report[i].steps[j];

      let image1Path = ghost3429Report[i].steps[j]?.image;
      let image2Path = ghost5822Report[i].steps[j]?.image;

      console.log(image1Path);
      console.log(image2Path);
      console.log('---------------------------------------');

      // Leer las imágenes
      if (image1Path && image2Path) {
        let imagen1 = fs.readFileSync(image1Path);
        let imagen2 = fs.readFileSync(image2Path);

        let data = await compareImages(imagen1, imagen2, options);
        let fileName = `${scenario}_${step.name}.png`;

        resultInfo = {
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime,
        };

        fs.writeFileSync(`./results/${fileName}`, data.getBuffer());
      }
    }
  }

  console.log(
    '------------------------------------------------------------------------------------',
  );
  console.log('Execution finished. Check the report under the results folder');

  return resultInfo;
}

(async () => console.log(await executeTest()))();
