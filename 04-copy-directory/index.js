const path = require('path');

const fs = require('fs');



fs.readdir(`${__dirname}`, { withFileTypes: true }, (err, files) => {
    files.forEach(elem => {
        if (elem.name === 'files-copy') {
            fs.readdir(`${__dirname}\\${elem.name}`, { withFileTypes: true }, (err, file) => {
                file.forEach(item => {
                    fs.unlink(`${__dirname}\\${elem.name}\\${item.name}`, err => {
                        if(err) throw err;
                     });
                })
            })
        }
    })

    fs.mkdir(path.join(__dirname, 'files-copy'), () => {
    })
    files.forEach(item => {
        if (!item.isFile()) {
            fs.readdir(`${__dirname}\\${item.name}`, { withFileTypes: true }, (err, newFiles) => {
                newFiles.forEach(elem => {
                    fs.copyFile(`${__dirname}\\${item.name}\\${elem.name}`, `${__dirname}\\files-copy\\${elem.name}`, () => {
                    })
                })
            })
        }
    })
})