const fs = require('fs')

function buildSharedString(string1, string2) {
    return [ ...string1].filter(x => [...string2].includes(x)).join('');
}

function process(string) {
    return string.split('\r\n\r\n')
                .reduce((total, curr) => {
                    return total + curr.split('\r\n')
                                       .reduce(buildSharedString).length;
                }, 0);
}

console.log(process(fs.readFileSync('puzzle_input.txt', 'utf8')));