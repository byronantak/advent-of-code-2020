const fs = require('fs')

function distinctFilter(value, index, self) {
	return self.indexOf(value) === index;
}

function distinctCharacterReduce(total, curr) {
	if (curr && curr.length && curr.length > 1) {
		return curr.split('').reduce(distinctCharacterReduce, total);
	}

	if (total.indexOf(curr) == -1) {
		return total + curr;
	}
	return total;
}

function process(string) {
	return string.split('\r\n\r\n')
				.map(x => {
					return x.split('\r\n')
							.filter(distinctFilter)
							.reduce(distinctCharacterReduce, '')
				})
				.length;
}

console.log(process(fs.readFileSync('puzzle_input.txt', 'utf8')));