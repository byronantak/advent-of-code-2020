const fs = require('fs'); 
const puzzle1Data = fs.readFileSync('./puzzle1.txt', {encoding:'utf8', flag:'r'});

function doIt(puzzle1Values) {
    return puzzle1Values.map(x => {
        return puzzle1Values.filter(y => {
            return x + y === 2020;
        }).map(z => {
            return [x, z];
        });
    })
    .filter(x => x.length !== 0)
    .map(x => x.map(y => y.reduce((total, z) => {
        return total * z;
    })));
}

function doItPart2(puzzle1Values) {
    return puzzle1Values.map(x => {
        return puzzle1Values.map(y => {
            return puzzle1Values.map(z => {
                if (z + x + y === 2020) {
                    return [x, y, z];
                }
                return null;
            })
            .filter(w => w != null)
        })
        .filter(x => {
            return Array.isArray(x) && x.find(y => y && y.length > 0)
        })
        .map(x => {
            if (Array.isArray(x)) {
                return x[0].reduce((total, y) => {
                    return total * y;
                });
            }
            return null  
        })
        .filter(x => x != null)
    }).filter(x => Array.isArray(x) && x.length > 1)
    .map(x => x[0])
    .filter((currValue, index, array) => {
        return array.indexOf(currValue) === index;
    });
}

function doItPart2Rewrite(puzzle1Values) {
    return puzzle1Values.map((x) => {
        const s = puzzle1Values.map((y) => {
            if (puzzle1Values.filter((z) => x + y + z === 2020).length > 0) {
                return [y, ...puzzle1Values.filter((z) => x + y + z === 2020)];
            }
            return null;
        })
        .filter(x => x != null)
        .map((y) => {
            console.log(x, 'and', y);
            return x * y.reduce((total, val) => total * val);

            return y;
        });
        // console.log(s);
        return s;
    })
    .filter(x => x != null && x.length > 0)
    // .map(x => console.log(x));
}

// doItPart2Rewrite(puzzle1Data.split('\n').map(x => Number(x)))
console.log(doItPart2Rewrite(puzzle1Data.split('\n').map(x => Number(x))))