const path = require('path');
const { readdir } = require('fs/promises');
const fs = require('fs');


const { unlink } = require('fs/promises');

fs.readdir(`${__dirname}/secret-folder`, {withFileTypes: true}, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        fs.stat(`${__dirname}/secret-folder/${file.name}`, (error, stats) =>{
            if(file.isFile()) {
                console.log(`${file.name.slice(0, file.name.indexOf('.'))}--${path.extname(file.name).slice(1)}--${stats.size}`)
            }
        })
      })
    }
  })