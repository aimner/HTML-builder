const fs = require('fs');
const { stdout } = process;

const readStream = fs.createReadStream('./01-read-file/text.txt')

readStream.on('data', (text) => {
    stdout.write(text);
})