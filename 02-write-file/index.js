const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

const writeStream = fs.createWriteStream('./02-write-file/text.txt')

stdout.write('Введите текст\n');
stdin.on('data', data => {
    fs.writeFile(__dirname, 'text.txt', () => {
        writeStream.write(data)
    })

    let newText = data.toString().split('').filter(item => item === '\r' || item === '\n' ? false : true).join('')

    if (newText === 'exit') {
        process.exit()
    }

});
process.on('exit', () => stdout.write('Надеюсь всё сделал правильно!)'));

function stop(signal) {
    process.exit();
}
process.on('SIGINT', stop);

