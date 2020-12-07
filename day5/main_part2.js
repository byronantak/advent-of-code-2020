const fs = require('fs');

function calculateSeatId(row, col) {
    return row * 8 + col;
}

function getRowNumber(rowString) {
    return parseInt(rowString.replace(/F/g, '0').replace(/B/g, '1'), 2);
}

function getColNumber(colString) {
    return parseInt(colString.replace(/L/g, '0').replace(/R/g, '1'), 2);
}

function calculateSeatIdFromString(fullString) {
    return calculateSeatId(getRowNumber(fullString.substr(0, 7)), getColNumber(fullString.substr(7, 3)))
}

function getHighestSeatId(seatStrings) {
    return Math.max(...seatStrings.map(calculateSeatIdFromString));
}

function curryVariableHolder(seatIds) {
    return function() {
        return [...Array(9999).keys()].filter(x => {
            return seatIds.includes(x + 1) && seatIds.includes(x - 1) && !seatIds.includes(x);
        })
    }
}

function findSeat(seatStrings) {
    return curryVariableHolder(seatStrings.map(calculateSeatIdFromString))();
}

console.log(getHighestSeatId(['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL']))

console.log(findSeat(fs.readFileSync('puzzle_input.txt', 'utf8').split('\r\n')));

