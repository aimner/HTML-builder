const path = require('path');
const fs = require('fs');

function createFile() {
    fs.mkdir(path.join(__dirname, 'project-dist'), () => {
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', () => {
        })
        fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', () => {
        })
        writeFile()
    })
}

function writeFile() {
    fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
        fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), data, () => {
            writeHtml()
            writeCss()
            copyAssets()
        })
    })
}

const arrFile = [];
fs.readdir(`${__dirname}\\styles`, { withFileTypes: true }, (err, files) => {
    files.forEach(item => {
        console.log(`${item.name.slice(0, item.name.indexOf('.'))}`)
        arrFile.push(`${item.name.slice(0, item.name.indexOf('.'))}`)
    })
})


let countHtml = 0;
let countCss = 0;

function writeHtml() {
    if (countHtml < arrFile.length) {
        fs.readFile(path.join(__dirname, 'components', `${arrFile[countHtml]}.html`), (err, data) => {
            let str = data.toString();
            fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), (err, text) => {
                let indexText = text.toString();
                let newStr = indexText.replace(`{{${arrFile[countHtml]}}}`, str);
                fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), newStr, (err) => {
                    ++countHtml;
                    writeHtml()
                })
            })
        });
    }
}

function writeCss() {
    if (countCss < arrFile.length) {
        fs.readFile(path.join(__dirname, 'styles', `${arrFile[countCss]}.css`), (err, data) => {
            let str = data.toString();

            fs.readFile(path.join(__dirname, 'project-dist', 'style.css'), (err, text) => {
                fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), str, (err) => {
                    ++countCss
                    writeCss()
                })
            })
        });
    }
}


function copyAssets() {
    fs.readdir(`${__dirname}\\assets`, { withFileTypes: true }, (err, files) => {
        fs.mkdir(path.join(`${__dirname}\\project-dist`, 'assets'), () => {

        })
        files.forEach((item) => {
            fs.mkdir(path.join(`${__dirname}\\project-dist\\assets`, `${item.name}`), () => {

            })
            fs.readdir(`${__dirname}\\assets\\${item.name}`, { withFileTypes: true }, (err, elements) => {

                elements.forEach(folderItem => {
                
                    fs.copyFile(`${__dirname}\\assets\\${item.name}\\${folderItem.name}`, `${__dirname}\\project-dist\\assets\\${item.name}\\${folderItem.name}`, () => {
                        
                    })
                })
            })
        })
    })
}

createFile()