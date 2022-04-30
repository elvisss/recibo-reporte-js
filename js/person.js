import { PRICE_BY_KW, IGV } from './global'

export default class Person {
	name;
	previousKW;
	currentKW;
	// calculated
	kwToPay;
	amountToPay;
	amountToPayPlusIGV;
	// after
	totalToPay;

	constructor(name, previousKW, currentKW) {
		this.name = name;
		this.previousKW = previousKW;
		this.currentKW = currentKW;
		this.kwToPay = this.currentKW - this.previousKW;
		this.calculate();
	}

	calculate() {
		this.amountToPay = this.kwToPay * PRICE_BY_KW;
		this.amountToPayPlusIGV = this.amountToPay + (this.amountToPay * IGV);
	}

	setTotalToPay(remaining) {
		this.totalToPay = this.amountToPayPlusIGV + remaining;
	}
}
