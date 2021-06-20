class Formulae {
	constructor(...num) {}
	sum() {
		let total = 0;
		for (let n of num) {
			total += n;
		}
		console.log(total);
	}
}

sum(10, 12);
