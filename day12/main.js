
/* coordObject { 
    currentAngle, (degrees) 
    yDisplacement, 
    xDisplacement 
} */

function toRadians(degrees)
{
  return degrees * (Math.PI / 180);
}

function moveForward(coordObject, distance) {
    return {
        ...coordObject,
        xDisplacement: coordObject.xDisplacement + (distance * Math.sin(toRadians(coordObject.currentAngle))),
        yDisplacement: coordObject.yDisplacement + (distance * Math.cos(toRadians(coordObject.currentAngle)))
    }
}

function rotate(coordObject, degrees) {
    return {
        ...coordObject,
        currentAngle: (coordObject.currentAngle + degrees) % 360
    }
}

function processInstruction(coordObj, instruction) {
    switch(instruction.charAt(0)) {
        case 'F':
            return moveForward(coordObj, Number(instruction.substr(1, instruction.length)));
        case 'R':
            return rotate(coordObj, Number(instruction.substr(1, instruction.length)));
        case 'L':
            return rotate(coordObj, - Number(instruction.substr(1, instruction.length)));
        case 'N':
            return {
                ...coordObj,
                yDisplacement: coordObj.yDisplacement + Number(instruction.substr(1, instruction.length))
            };
        case 'S':
            return {
                ...coordObj,
                yDisplacement: coordObj.yDisplacement - Number(instruction.substr(1, instruction.length))
            };
        case 'E':
            return {
                ...coordObj,
                xDisplacement: coordObj.xDisplacement + Number(instruction.substr(1, instruction.length))
            };
        case 'W':
            return {
                ...coordObj,
                xDisplacement: coordObj.xDisplacement - Number(instruction.substr(1, instruction.length))
            };
    }

    return coordObj;
}

function calcManhattanDistance(coordObj) {
    return Math.round(Math.abs(coordObj.xDisplacement)) + Math.round(Math.abs(coordObj.yDisplacement));
}

function processInstructions(instructions, currentAngle, yDisplacement, xDisplacement) {
    return calcManhattanDistance(instructions.reduce((coordObj, instruction) => {
        return processInstruction(coordObj, instruction);
    }, { currentAngle, yDisplacement, xDisplacement }));
}

console.log(
    processInstructions(
        require('fs').readFileSync('puzzle_input.txt', 'utf-8').split('\r\n'), 90, 0, 0
    )
)