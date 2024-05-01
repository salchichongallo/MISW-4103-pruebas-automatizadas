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
