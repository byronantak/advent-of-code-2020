/* coordObject { 
    currentAngle, (degrees of waypoint) -> not really need anymore
    yDisplacement, 
    xDisplacement,
    wayPointX, 
    wayPointY
} */

function toRadians(degrees)
{
  return degrees * (Math.PI / 180);
}

function moveForward(coordObject, distance) {
    return {
        ...coordObject,
        xDisplacement: coordObject.xDisplacement + (coordObject.wayPointX * distance),
        yDisplacement: coordObject.yDisplacement + (coordObject.wayPointY * distance)
    }
}

function rotateX(x, y, degrees) {
    return x * Math.cos(toRadians(degrees)) + y * Math.sin(toRadians(degrees));
}

function rotateY(x, y, degrees) {
    return - x * Math.sin(toRadians(degrees)) + y * Math.cos(toRadians(degrees));
}

function rotate(coordObject, degrees) {
    return {
        ...coordObject,
        wayPointX: rotateX(coordObject.wayPointX, coordObject.wayPointY, degrees),
        wayPointY: rotateY(coordObject.wayPointX, coordObject.wayPointY, degrees),
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
                wayPointY: coordObj.wayPointY + Number(instruction.substr(1, instruction.length))
            };
        case 'S':
            return {
                ...coordObj,
                wayPointY: coordObj.wayPointY - Number(instruction.substr(1, instruction.length))
            };
        case 'E':
            return {
                ...coordObj,
                wayPointX: coordObj.wayPointX + Number(instruction.substr(1, instruction.length))
            };
        case 'W':
            return {
                ...coordObj,
                wayPointX: coordObj.wayPointX - Number(instruction.substr(1, instruction.length))
            };
    }

    return coordObj;
}

function calcManhattanDistance(coordObj) {
    return Math.round(Math.abs(coordObj.xDisplacement)) + Math.round(Math.abs(coordObj.yDisplacement));
}

function processInstructions(instructions, currentAngle, yDisplacement, xDisplacement, wayPointX, wayPointY) {
    return calcManhattanDistance(instructions.reduce((coordObj, instruction) => {
        return processInstruction(coordObj, instruction);
    }, { currentAngle, yDisplacement, xDisplacement, wayPointX, wayPointY }));
}

console.log(
    processInstructions(
        require('fs').readFileSync('puzzle_input.txt', 'utf-8').split('\r\n'), 90, 0, 0, 10, 1
    )
)