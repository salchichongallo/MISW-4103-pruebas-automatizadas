const fs = require('fs');
const path = require('path');

const credentials = {
  email: process.env.GHOST_EMAIL,
  password: process.env.GHOST_PASSWORD,
};

const filename = path.join(__dirname, '../e2e-kraken/properties.json');

const content = JSON.stringify(credentials, null, 2);

fs.writeFileSync(filename, content);
