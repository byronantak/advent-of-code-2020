const fs = require('fs'); 
const puzzle1Data = fs.readFileSync('./puzzle_1.txt', {encoding:'utf8', flag:'r'});

function traverseGridRecurPart1(grid, down, right) {
    if (grid.length < down) {
        return 0;
    }

    if (isTree(grid, down , right)) {
        return 1 + traverseGridRecurPart1(grid, down + 1, right + 3);
    }

    return traverseGridRecurPart1(grid, down + 1, right + 3)
}

function traverseGridPart1(grid) {
    return traverseGridRecurPart1(grid, 0, 0)
}

function isTree(grid, i, j) {
    return grid[i] && grid[i].charAt(j % grid[i].length) === '#';
}

function traverseGridRecurPart2(grid, down, right, downIncrement, rightIncrement) {
    if (grid.length < down) {
        return 0;
    }

    if (isTree(grid, down , right)) {
        return 1 + traverseGridRecurPart2(grid, down + downIncrement, right + rightIncrement, downIncrement, rightIncrement);
    }

    return traverseGridRecurPart2(grid, down + downIncrement, right + rightIncrement, downIncrement, rightIncrement)
}

function traverseGridPart2(grid) {
    return (
        traverseGridRecurPart2(grid, 0, 0, 1, 1)
        * traverseGridRecurPart2(grid, 0, 0, 1, 3)
        * traverseGridRecurPart2(grid, 0, 0, 1, 5)
        * traverseGridRecurPart2(grid, 0, 0, 1, 7)
        * traverseGridRecurPart2(grid, 0, 0, 2, 1)
    );
}

console.log(traverseGridPart2(puzzle1Data.split('\r\n')))