import "./../style.css";
import Person from './person';
import Report from './report';

const anthony = new Person('Anthony', 268, 356);
const jonathan = new Person('Jonathan', 332, 438);
const heleman = new Person('Heleman', 37, 49);
const elvis = new Person('Elvis', 29, 38);
const jose = new Person('José', 264, 350);

const people = [anthony, jonathan, heleman, elvis, jose];

const report = new Report(people);

const form = document.getElementById('formReporte');

form.onsubmit = (e) => {
	e.preventDefault();
	report.generateReport();
}
