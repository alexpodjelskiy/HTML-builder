const fs = require('fs');

const path = require('path');

const { stdout } = process;

const filePath = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(filePath, 'utf-8');

stream.on('data', data => stdout.write(data));