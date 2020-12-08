const fs = require('fs')

function interpretOpCode(codeArray, codeVisitCountArray, globalCounter, lineNumber, opcode, param) {
    ++codeVisitCountArray[lineNumber];
    switch (opcode) {
        case 'acc':
            return doesCodeArrayStop(codeArray, codeVisitCountArray, 
                                globalCounter + param, lineNumber + 1);
        case 'nop':
            return doesCodeArrayStop(codeArray, codeVisitCountArray, 
                                globalCounter, lineNumber + 1);
        case 'jmp':
            return doesCodeArrayStop(codeArray, codeVisitCountArray, 
                                globalCounter, lineNumber + param);
    }
}

function doesCodeArrayStop(codeArray, codeVisitCountArray, globalCounter, lineNumber) {
    // console.log(codeArray);
    if (codeVisitCountArray[lineNumber] >= 1) {
        return [false, globalCounter];
    }
    if (lineNumber >= codeArray.length) {
        return [true, globalCounter];
    }

    return interpretOpCode(codeArray, codeVisitCountArray, globalCounter, lineNumber, 
                    codeArray[lineNumber].split(' ')[0], Number(codeArray[lineNumber].split(' ')[1]));
}

function flipOpCodeExceptAcc(codeArray, lineToFlip) {
     return codeArray.map((value, i) => {
         if (i === lineToFlip) {
             if (value.includes('nop')) {
                 return  value.replace('nop','jmp');
             }
             if (value.includes('jmp')) {
                 return  value.replace('jmp','nop');
             }
         }
         return value;
     });
}

function findFinishingGlobalCount(codeArray) {
    return codeArray.map((line, lineNumber) => {
        return doesCodeArrayStop(flipOpCodeExceptAcc(codeArray, lineNumber), codeArray.map(x => 0), 0, 0);
    }).filter(x => {
        return x[0];
    })[0][1];
}

function run(code) {
    return findFinishingGlobalCount(code.split('\r\n'));
}

console.log(
    run(
        fs.readFileSync('puzzle_input.txt', 'utf8')
        )
    );