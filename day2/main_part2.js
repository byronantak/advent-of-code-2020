const fs = require('fs')

console.log(getValidNumberPasswords('./puzzle_input.txt'))

function getValidNumberPasswords(filename) {
	try {
		return fs.readFileSync(filename, 'utf8')
			.split('\n')
			.reduce((total, line) => {
				if (isLineValid(line)) {
					console.log(line);
					return total + 1;
				}
				return total;
			}, 0);
	} catch (err) {
		console.error(err)
	}
}

function isLineValid(line) {
	return isPasswordValidLong(
		line.split(': ')[0].split(' ')[1], 
		line.split(': ')[0].split(' ')[0].split('-')[0],
	 	line.split(': ')[0].split(' ')[0].split('-')[1],
	 	line.split(': ')[1]);
}

function isPasswordValidLong(char, pos1, pos2, password) {
	return password[pos1 - 1] == char ^ password[pos2 - 1] == char;
}
