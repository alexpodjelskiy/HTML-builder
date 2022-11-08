const fs = require('fs');
const path = require('path');

let dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, {withFileTypes: true}, (error, files) => {
  if (error) {
    console.log(error.message);
  } else {
    for (let file of files) {
      if (file.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (error, stats) => {
          if (error) {
            console.log(error.message);
          } else {
            console.log(path.parse(path.join(__dirname, 'secret-folder', file.name)).name + 
            ' - ' + path.extname(path.join(__dirname, 'secret-folder', file.name)).slice(1) + 
            ' - ' + stats.size + ' bytes');
          }
        });
      }
    }
  }
});