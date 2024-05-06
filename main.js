function add (n1, n2) {
	return n1 + n2;
}

function subtract (n1, n2) {
	return n1 - n2;
}

function multiply (n1, n2) {
	return n1 * n2;
}

function divide (n1, n2) {
	return n1 / n2;
}

function percentage (num) {
	return num / 100;
} 

function updateDisplay (btnText) {
	if (curr.innerText == "") {
		
	}


	if (numbers.includes(btnText)) {
		curr.innerText += btnText;
	} else if (operators.includes(btnText) && curr.innerText != "") {
		prev.innerText = `${curr.innerText} ${btnText}`;
		curr.innerText = "";
	} else {
		console.log("Others");
	}

}

const buttons = document.querySelectorAll('.key-buttons button');
const prev = document.querySelector('.prev-operand')
const curr = document.querySelector('.curr-operand')
const operators = [...document.querySelectorAll('.operator')].map(operator => operator.innerText)
const numbers = [...document.querySelectorAll('.number')].map(number => number.innerText)

buttons.forEach(button => {
	button.addEventListener('click',  () => updateDisplay(button.innerText))
})
