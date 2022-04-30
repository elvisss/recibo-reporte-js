import {
	TABLE_BODY_EL,
	TOTAL_REMAINING_EL,
	REMAINING_BY_PERSON_EL,
	TOTAL_KW,
	TOTAL_AMOUNT
} from './global'
import converToDecimal from './utils'

export default class Report {
	amountRemaining = 0;
	remainingByPerson = 0; 

	// totals
	totalKW = 0;
	totalToPay = 0;
	totalToPayPlusIGV = 0;
	totalToPayPlusRemaining = 0;

	constructor(data) {
		this.data = data;
	}

	generateReport() {
		let subTotal = 0;
		this.data.forEach((person) => {
			subTotal += person.amountToPayPlusIGV;
		})

		this.amountRemaining = TOTAL_AMOUNT - subTotal;
		this.remainingByPerson = this.amountRemaining / this.data.length;

		// insert in DOM
		TOTAL_REMAINING_EL.innerText = converToDecimal(this.amountRemaining);
		REMAINING_BY_PERSON_EL.innerText = converToDecimal(this.remainingByPerson);

		this.data.forEach((person) => {
			person.setTotalToPay(this.remainingByPerson);
			console.log(person);
			this.totalKW += person.kwToPay;
			this.totalToPay += person.amountToPay;
			this.totalToPayPlusIGV += person.amountToPayPlusIGV;
			this.totalToPayPlusRemaining += person.totalToPay;
		});

		this.generateTableHTML();
	}

	generateTableHTML() {
		let html = '';
		this.data.forEach((person) => {
			html += `
				<tr class="border-b bg-gray-800 border-gray-700 odd:bg-gray-800 even:bg-gray-700">
					<td scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">${person.name}</td>
					<td class="px-6 py-4">${person.previousKW}</td>
					<td class="px-6 py-4">${person.currentKW}</td>
					<td class="px-6 py-4">${person.kwToPay}</td>
					<td class="px-6 py-4">${converToDecimal(person.amountToPay)}</td>
					<td class="px-6 py-4">${converToDecimal(person.amountToPayPlusIGV)}</td>
					<td class="px-6 py-4"><span class="font-bold">${converToDecimal(person.totalToPay)}</span></td>
				</tr>
			`
		})

		html += `
			<tr class="border-b bg-gray-800 border-gray-700 odd:bg-gray-800 even:bg-gray-700">
				<td scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">TOTALES</td>
				<td class="px-6 py-4"></td>
				<td class="px-6 py-4"></td>
				<td class="px-6 py-4">${converToDecimal(this.totalKW)}</td>
				<td class="px-6 py-4">${converToDecimal(this.totalToPay)}</td>
				<td class="px-6 py-4">${converToDecimal(this.totalToPayPlusIGV)}</td>
				<td class="px-6 py-4">${converToDecimal(this.totalToPayPlusRemaining)}</td>
			</tr>
		`

		TABLE_BODY_EL.innerHTML = html;
	}
}
