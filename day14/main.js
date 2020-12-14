function getMaskedValue(mask, value) {
    return mask.split('').map((x, i) => {
        return {
            index: i,
            value: x
        }
    })
    .filter(obj => {
        return obj.value !== 'X' && obj.value !== 'x'
    })
    .reduce((value, obj) => {
        return parseInt(value.toString(2).padStart(mask.length, '0').split('').map((x, index) => {
            if (index === obj.index) {
                return obj.value;
            }
            return x;
        }).join(''), 2);
    }, value);
}

function getMemoryLocation(memoryString) {
    return Number(
        /\[(.*?)\]/.exec(memoryString)[1]
    );
}

function getInstructionObject(instruction) {
    return {
        memoryLocation: getMemoryLocation(instruction.split(' = ')[0]),
        value: Number(instruction.split(' = ')[1])
    }
}

function performInstructionOnMemory(memory, mask, instructions) {
    return instructions.reduce((memory, instruction) => {
        return {
            ...memory,
            [getInstructionObject(instruction).memoryLocation]: 
                getMaskedValue(mask, getInstructionObject(instruction).value)
         
        };
    }, memory);
}

function processInstructions(memory, instructionsSets) {
    return instructionsSets.reduce((memory, instructionSet) => {
        return {
            ...memory,
            ...performInstructionOnMemory(memory, instructionSet[0], instructionSet.slice(1))
        }
    }, memory);
}

function getInstructionSets(instructionFile) {
    return instructionFile.split('mask = ').map(x => {
        return x.split('\r\n').filter(x => x !== '')
    }).filter(x => Array.isArray(x) && x.length > 0);
}

function initProcess(instructionFile) {
    return Object.values(processInstructions({}, getInstructionSets(instructionFile))).reduce((total, curr) => {
        return total + curr;
    });
}

console.log(
    initProcess(
        require('fs').readFileSync('puzzle_input.txt', 'utf8')
    )
)