const fs = require('fs'); 

function hasRequiredKeys(dictionary) {
    return Object.keys(dictionary).length >= 7 && 
        ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'].reduce((total, x) => {
            if (x == 'cid') {
                return total;
            }
            return total && Object.keys(dictionary).includes(x);
        }, true);
}

function buildDictionaryFromString(string) {
    return string.split(' ').reduce((dictionary, keyValue) => {
        dictionary[keyValue.split(':')[0]] = keyValue.split(':')[1];
        return dictionary;
    }, {});
}

function isIdStringValid(idString) {
    return hasRequiredKeys(buildDictionaryFromString(idString));
}

function isIdStringValidWithValidation(idString) {
    console.log(idString)
    console.log(buildDictionaryFromString(idString))
    console.log(hasRequiredKeys(buildDictionaryFromString(idString)))
    return hasRequiredKeys(buildDictionaryFromString(idString))
        && Object.entries(buildDictionaryFromString(idString))
            .reduce((total, [key,value]) => {
                console.log(key, value);
                return total && validateKey(key, value)
            }, true); 
    
    ;
}

function validateKey(key, value) {
    switch(key) {
        case 'byr ':
            return validateByr(value);
        case 'iyr':
            return validateIyr(value);
        case 'eyr':
            return validateEyr(value);
        case 'hgt':
            return validateHgt(value);
        case 'hcl':
            return validateHcl(value);
        case 'ecl':
            return validateEcl(value);
        case 'pid':
            return validatePid(value);
        case 'cid':
            return true;
        default: 
            return true;
    }
}

function countValidIds(idArray) {
    return idArray.map(x => x.split('\n').join(' '))
        .reduce((total, currentValue) => {
            if (isIdStringValid(currentValue)) {
                console.log(currentValue);
                return total + 1;
            }
            return total;
        }, 0);
}

function countValidIdsWithValidation(idArray) {
    return idArray.map(x => x.split('\n').join(' '))
        .reduce((total, currentValue) => {
            if (isIdStringValidWithValidation(currentValue)) {
                console.log(currentValue);
                return total + 1;
            }
            return total;
        }, 0);
}

function validateNumber(number, min, max) {
    return number >= min && number <= max;
}

function validateByr(value) {
    return validateNumber(Number(value), 1920, 2002);
}

function validateHgt(value) {
    return (Number(value.split('in')[0]) >= 59 && Number(value.split('in')[0]) < 76) || 
        (Number(value.split('cm')[0]) >= 150 && Number(value.split('cm')[0]) < 193) ;
}

function validateIyr(value) {
    return validateNumber(Number(value), 2010, 2020);
}

function validateEyr(value) {
    return validateNumber(Number(value), 2020, 2030);
}

function validateHcl(value) {
    return validateWithRegex(value, new RegExp('#[[a-f]{6}|[0-9]{6}]'));
}

function validateEcl(value) {
    return validateWithRegex(value, new RegExp('(amb|blu|brn|gry|grn|hzl|oth)'));
}

function validatePid(value) {
    return validateWithRegex(value, new RegExp('[0-9]{9}'));
}

function validateWithRegex(value, regex) {
    return Boolean(regex.test(value))
}

// console.log(puzzle1Data)
// console.log(puzzle1Data.length)
// console.log(hasRequiredKeys({'byr': 1}))
// console.log(hasRequiredKeys({'byr': 1, 'lol': 1}))
// console.log(hasRequiredKeys({
//     'byr': 1, 'iyr': 1, 'eyr': 1, 'hgt': 1, 'hcl': 1, 'ecl': 1, 'pid': 1, 'cid': 1
// }))
// console.log(hasRequiredKeys({
//     'byr': 1, 'iyr': 1, 'eyr': 1, 'hgt': 1, 'hcl': 1, 'ecl': 1, 'pid': 1
// }))

// console.log(buildDictionaryFromString(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
// byr:1937 iyr:2017 cid:147 hgt:183cm`));
// console.log(isIdStringValid(`hcl:#cfa07d eyr:2025 pid:166559648
// iyr:2011 ecl:brn hgt:59in`));

console.log(countValidIds(fs.readFileSync('./puzzle_1.txt', {encoding:'utf8', flag:'r'}).split('\r\n\r\n')));
console.log(countValidIdsWithValidation(fs.readFileSync('./puzzle_1.txt', {encoding:'utf8', flag:'r'}).split('\r\n\r\n')));
console.log(
    countValidIdsWithValidation(`eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`).split('\r\n\r\n') 
);