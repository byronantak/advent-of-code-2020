const fs = require('fs')

function interpretOpCode(codeArray, codeVisitCountArray, globalCounter, lineNumber, opcode, param) {
    ++codeVisitCountArray[lineNumber];
    switch (opcode) {
        case 'acc':
            return runCodeArray(codeArray, codeVisitCountArray, 
                                globalCounter + param, lineNumber + 1);
        case 'nop':
            return runCodeArray(codeArray, codeVisitCountArray, 
                                globalCounter, lineNumber + 1);
        case 'jmp':
            return runCodeArray(codeArray, codeVisitCountArray, 
                                globalCounter, lineNumber + param);
    }

}

function runCodeArray(codeArray, codeVisitCountArray, globalCounter, lineNumber) {
    if (codeVisitCountArray[lineNumber] >= 1) {
        return globalCounter;
    }
    return interpretOpCode(codeArray, codeVisitCountArray, globalCounter, lineNumber, 
                    codeArray[lineNumber].split(' ')[0], Number(codeArray[lineNumber].split(' ')[1]));
}

function runInfiniteLoopStopper(codeArray) {
     return runCodeArray(codeArray, codeArray.map(x => 0), 0, 0);
}


function run(code) {
    return runInfiniteLoopStopper(code.split('\r\n'), 0, 0);
}

console.log(
    run(
        fs.readFileSync('puzzle_input.txt', 'utf8')
        )
    );