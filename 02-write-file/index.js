const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

let filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath, 'utf-8');

stdout.write('Hello! Please enter your message.\n')

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', function() {
  process.exit();
});

process.on('exit', () => stdout.write('Goodbye!\n'));