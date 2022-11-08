const fs = require('fs');
const path = require('path');

let dirPath = path.join(__dirname, 'project-dist');

fs.mkdir(dirPath, { recursive : true }, error => {
  if (error) {
    console.log(error.message)
  } else {
    let assets = path.join(__dirname, 'project-dist', 'assets');
    fs.rm(assets, { recursive: true, force: true }, error => {
      if (error) console.log(error.message);
      fs.mkdir(assets, { recursive: true }, error => {
        if (error) console.log(error.message);
        fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (error, assetsDir) => {
          if (error) {
            console.log(error.message);
          } else {
            for (let folder of assetsDir) {
              fs.mkdir(path.join(__dirname, 'project-dist', 'assets', folder.name), { recursive: true }, error => {
                if (error) console.log(error.message);
                fs.readdir(path.join(__dirname, 'assets', folder.name), {withFileTypes: true}, (error, files) => {
                  if (error) {
                    console.log(error.message);
                  } else {
                    for (let file of files) {
                      fs.copyFile(path.join(__dirname, 'assets', folder.name, file.name), path.join(__dirname, 'project-dist', 'assets', folder.name, file.name), error => {
                        if (error) console.log(error.message);
                      });
                    };
                  }
                });
              });
            };
          }
        });
      });
      
      let wrStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
      fs.readdir(path.join(__dirname, 'styles'), (error, files) => {
        if (error) {
          console.log(error.message);
        } else {
          for (let file of files) {
            if (path.parse(file).ext === '.css') {
              let rdStream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
              rdStream.pipe(wrStream);
            }
          };
        }
      });

      fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (error, templateContent) => {
        if (error) {
          console.log(error.message);
        } else {
          fs.readdir(path.join(__dirname, 'components'), (error, files) => {
            if (error) {
              console.log(error.message);
            } else {
              for (let file of files) {
                fs.readFile(path.join(__dirname, 'components', file), 'utf-8', (error, componentsContent) => {
                  if (error) {
                    console.log(error.message);
                  } else {
                    templateContent = templateContent.replace(`{{${path.parse(file).name}}}`, componentsContent);
                    let wrStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
                    wrStream.write(templateContent);
                  }
                });
              };
            }
          });
        }
      });
    });
  }
});