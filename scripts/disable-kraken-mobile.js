const fs = require('fs');
const path = require('path');

const adbFilename = path.join(
  __dirname,
  '../node_modules',
  'kraken-node/lib/utils/ADB.js',
);

const content = fs.readFileSync(adbFilename, 'utf-8');

const result = content.replace(
  'var devices = [];',
  'var devices = [];\nconsole.log("SKIPPED KrakenMobile");\nreturn devices;',
);

fs.writeFileSync(adbFilename, result, 'utf-8');

const webClientFilename = path.join(
  __dirname,
  '../node_modules',
  'kraken-node/lib/clients/WebClient.js',
);
const baseUrl = process.env.KRAKEN_BASE_URL || 'http://localhost:2358/';
fs.writeFileSync(
  webClientFilename,
  fs
    .readFileSync(webClientFilename, 'utf-8')
    .replace(
      'capabilities: this.capabilities()',
      'capabilities: this.capabilities(),\nbaseUrl: process.env.KRAKEN_BASE_URL || "http://localhost:2368",\n',
    ),
  'utf-8',
);
