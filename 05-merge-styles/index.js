const path = require('path');

const fs = require('fs');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', err => {

})

fs.readdir(`${__dirname}\\styles`, {withFileTypes: true}, (err, files) => {
     files.forEach(item => {
        if(path.extname(item.name) === '.css') {
           fs.readFile(path.join(__dirname, 'styles', item.name), 'utf-8', (err, data) => {
               fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, err => {
               })
           })
        }
     })
  })