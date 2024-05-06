const fs = require('fs');
const path = require('path');

const LINE_PATCH = `capabilities: this.capabilities(),baseUrl: process.env.KRAKEN_BASE_URL || "${process.env.GHOST_BASE_URL}",\n`;

const filename = path.join(
  __dirname,
  '../node_modules',
  'kraken-node/lib/clients/WebClient.js',
);

const content = fs.readFileSync(filename, 'utf-8');

let newContent = '';
const [...lines] = content.split('\n');
for (const line of lines) {
  if (!line.trim().startsWith('capabilities:')) {
    newContent += line + '\n';
  } else {
    newContent += LINE_PATCH;
  }
}

fs.writeFileSync(filename, newContent, 'utf-8')
