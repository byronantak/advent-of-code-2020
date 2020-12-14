function getMemoryAddressesWithMask(mask, value) {
    return mask.split('')
        .map((x, i) => {
            return {
                index: i,
                value: x
            }
        })
        .filter((x) => {
            return x.value === 'x' || x.value === 'X';
        })    
        .reduce((memoryAddresses, obj) => {
            // const originalVal = value.toString(2).padStart(mask.length, '0');
            // const val1 = value.toString(2).padStart(mask.length, '0').split('').map((x, index) => {
            //     if (mask.charAt(index) === '1') {
            //         return '1';
            //     }

            //     if (index === obj.index) {
            //         return '1';
            //     }

            //     return x;
            // }).join('');
            // const val2 = value.toString(2).padStart(mask.length, '0').split('').map((x, index) => {
            //     if (mask.charAt(index) === '1') {
            //         return '1';
            //     }

            //     if (index === obj.index) {
            //         return '0';
            //     }

            //     return x;
            // }).join('');
            // console.log('index');
            // console.log(obj.index);
            // console.log('====');
            // console.log(mask);
            // console.log('====');
            // console.log('val1');
            // console.log(val1);
            
            // console.log('originalVal');
            // console.log(originalVal);
            // console.log('val2');
            // console.log(val2);
            
            // console.log('originalVal');
            // console.log(originalVal);
            return [ 
                ...memoryAddresses, 
                parseInt(value.toString(2).padStart(mask.length, '0').split('').map((x, index) => {
                    if (mask.charAt(index) === '1') {
                        return '1';
                    }

                    if (index === obj.index) {
                        return '1';
                    }

                    return x;
                }).join(''), 2),
                parseInt(value.toString(2).padStart(mask.length, '0').split('').map((x, index) => {
                    if (mask.charAt(index) === '1') {
                        return '1';
                    }

                    if (index === obj.index) {
                        return '0';
                    }

                    return x;
                }).join(''), 2)
            ];
        }, []);
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
        console.log('mask');
        console.log(mask);
        console.log('Mem Addresses');
        console.log(getMemoryAddressesWithMask(mask, getInstructionObject(instruction).memoryLocation));
        return {
            ...memory,
            // [getMemoryAddressesWithMask(mask, getInstructionObject(instruction).memoryLocation)]: getInstructionObject(instruction).value
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
        require('fs').readFileSync('puzzle_example_part2.txt', 'utf8')
    )
)