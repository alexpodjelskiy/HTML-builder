const fs = require('fs');
const path = require('path');

let wrStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

let dirPath = path.join(__dirname, 'styles');

fs.readdir(dirPath, (error, files) => {
  if (error) {
    console.log(error.message);
  } else
    for (let file of files) {
      if (path.parse(file).ext === '.css') {
        let styles = path.join(__dirname, 'styles', file);
        let rdStream = fs.createReadStream(styles, 'utf-8');
        rdStream.pipe(wrStream);
      }
    };
  } 
);