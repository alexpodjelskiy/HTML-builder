const fs = require('fs');
const path = require('path');

let dirPath = path.join(__dirname, 'files-copy')

fs.rm(dirPath, { recursive: true, force: true }, () => {
  fs.mkdir(dirPath, { recursive: true }, () => {
    fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (error, files) => {
      if (error) {
        console.log(error.message);
      } else {
        for (let file of files) {
          let files = path.join(__dirname, 'files', file.name);
          let filesCopy = path.join(__dirname, 'files-copy', file.name);
          fs.copyFile(files, filesCopy, error => {
            if (error) console.log(error.message);
          });
        };
      }
    });
  });
});
