const fs = require('fs');
const path = require('path');

function collecScreenshots(ghostVersion) {
  const screenshotsPath = path.join(
    __dirname,
    '../cypress/screenshots',
    ghostVersion,
  );

  const imagesPaths = fs
    .readdirSync(screenshotsPath, {
      recursive: true,
      withFileTypes: true,
    })
    .filter(file => !file.isDirectory())
    .map(file => path.join(file.path, file.name));

  if (!imagesPaths) {
    return;
  }

  const stepsByScenario = {};

  for (const imagePath of imagesPaths) {
    const name = imagePath.split('/').at(-1).split('.png')[0];
    const [scenario, index, stepName] = name.split('---');

    if (!stepsByScenario[scenario]) {
      stepsByScenario[scenario] = { scenario, steps: [] };
    }

    const step = {
      name: stepName,
      image: imagePath,
      index: parseInt(index),
    };
    stepsByScenario[scenario].steps.push(step);
  }

  Object.values(stepsByScenario).forEach(scenario => {
    scenario.steps.sort((a, b) => (a.index < b.index ? -1 : 1));
  });

  const reportDir = path.join(__dirname, '../reports');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  fs.writeFileSync(
    path.join(reportDir, `cypress-steps-${ghostVersion}.json`),
    JSON.stringify(stepsByScenario, null, 2),
  );
}

collecScreenshots('ghost3429');
collecScreenshots('ghost5822');
