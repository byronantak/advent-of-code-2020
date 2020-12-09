const fs = require('fs')

function isTargetMet(number1, number2, target) {
    return number1 + number2 === target;
}

function doesWindowCreateTarget(windowedNumbers, targetNumber) {
    return windowedNumbers.reduce((total, curr)=> {
        return total || windowedNumbers.reduce((subtotal, temp) => {
            return subtotal || isTargetMet(curr, temp, targetNumber);
        }, false);
    }, false);
}

function isNumberSumOfLastSlidingWindow(numbers, currentIndex, slidingWindow) {
    return doesWindowCreateTarget(numbers.slice(currentIndex - slidingWindow, currentIndex), numbers[currentIndex]);
}

function findNumberNotTheSumOfSlidingWindow(numbers, slidingWindow) {
    return numbers.filter((x, index) => {
        if (index < slidingWindow) {
            return false;
        }
        return !numbers.filter((val, index) => {
            if (index < slidingWindow) {
                return false;
            }
            return isNumberSumOfLastSlidingWindow(numbers, index, slidingWindow);
        }).includes(x);
    });
}

function run(string, slidingWindow) {
    return findNumberNotTheSumOfSlidingWindow(string.split('\r\n').map(x => Number(x)), slidingWindow);
}

console.log(
    run(
        fs.readFileSync('puzzle_input.txt', 'utf8'), 25
        )
    );