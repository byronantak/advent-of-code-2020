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

function isPasswordValidLong(char, min, max, password) {
	return countLetters(password, char) >= min 
		&& countLetters(password, char) <= max;
}

function countLetters(password, char) {
	return password.split('').reduce((total, val) => {
		if (val === char) {
			return total + 1;
		}
		return total;
	}, 0);
}
