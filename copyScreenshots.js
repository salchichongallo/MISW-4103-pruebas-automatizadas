const fs = require("fs");
const path = require("path");

// Ruta de la carpeta donde Cypress guarda las capturas de pantalla
const cypressScreenshotsPath = path.join(
  __dirname,
  "e2e-cypress/cypress/screenshots/ghost5822/create-tag-1.cy.js/"
);

console.log(cypressScreenshotsPath);

// Ruta de la carpeta bitmaps_reference de BackstopJS
const backstopReferencePath = path.join(
  __dirname,
  "backstopjs/backstop_data/ghost5822/"
);

console.log(backstopReferencePath);

fs.readdir(cypressScreenshotsPath, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const sourcePath = path.join(cypressScreenshotsPath, file);
    const destinationPath = path.join(backstopReferencePath, file);

    fs.copyFile(sourcePath, destinationPath, (err) => {
      if (err) throw err;
      console.log(`${file} fue copiado a ${destinationPath}`);
    });
  });
});
