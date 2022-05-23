const path = require('path');
const { readdir } = require('fs/promises');
const fs = require('fs');


const { unlink } = require('fs/promises');
const { dirname } = require('path');

fs.readdir(`${__dirname}`, {withFileTypes: true}, (err, files) => {
    fs.mkdir(path.join(__dirname, 'files-copy'), () => {
    })
     files.forEach(item => {
         if(!item.isFile()) {
             fs.readdir(`${__dirname}\\${item.name}`, {withFileTypes: true}, (err, newFiles) => {
               newFiles.forEach(elem => {
                   fs.copyFile(`${__dirname}\\${item.name}\\${elem.name}`, `${__dirname}\\files-copy\\${elem.name}`, () => {
                   })
               })
             })
         }
     })
  })