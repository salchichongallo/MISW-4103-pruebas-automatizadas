const fs = require('fs');
const path = require('path');

const cypressPath = path.join(__dirname, '../e2e-cypress');
const envFilename = path.join(cypressPath, 'cypress.env.json');
const examplefilename = path.join(cypressPath, 'cypress.example.json');

const readJson = filePath => JSON.parse(fs.readFileSync(filePath));

const exampleFile = readJson(examplefilename);

const envFile = fs.existsSync(envFilename)
  ? readJson(envFilename)
  : exampleFile;

envFile['email'] = 'john@doe.com';
envFile['password'] = Math.random().toString(36).slice(0, 16);

fs.writeFileSync(envFilename, JSON.stringify(envFile, null, 2) + '\n');
