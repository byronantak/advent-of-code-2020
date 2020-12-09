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

function findEndIndexOfContigousRegionWhichAddsToTarget(numbers, startIndex, nextIndex, totalSoFar, target) {
    if (totalSoFar + numbers[nextIndex] > target) {
        return -1;
    }

    if (totalSoFar + numbers[nextIndex] === target) {
        return nextIndex;
    }

    return findEndIndexOfContigousRegionWhichAddsToTarget(numbers, startIndex, nextIndex + 1, totalSoFar + numbers[nextIndex], target);
}

function getSumOfMinAndMaxInRange(range) {
    return Math.min(...range[0]) + Math.max(...range[0]);
}

function findContiguousRangeWhichAddsToTarget(numbers, target) {
    return getSumOfMinAndMaxInRange(
        numbers.map((x, index) => {
            return {
                value: x,
                startIndex: index,
                endIndex: findEndIndexOfContigousRegionWhichAddsToTarget(numbers, index, index, 0, target)
            };
        })
        .filter(x => {
            return x.endIndex !== -1 && x.endIndex - x.startIndex >= 2;
        })
        .map(x => {
            return numbers.slice(x.startIndex, x.endIndex + 1);
        })
   );
}

function run(string, target) {
    return findContiguousRangeWhichAddsToTarget(
        string.split('\r\n').map(x => Number(x)), 
        target
    );
}

console.log(
    run(require('fs').readFileSync('puzzle_input.txt', 'utf8'), 18272118)
);