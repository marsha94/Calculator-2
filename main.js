class Calculator {
	constructor(prevOperandtextElement, currOperandtextElement) {
		this.prevOperandtextElement = prevOperandtextElement;
		this.currOperandtextElement = currOperandtextElement;
		this.clear();
	}

	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	delete() {
		if (this.currentOperand == '') return;
		this.currentOperand = this.currentOperand.slice(0, this.currentOperand.length - 1);
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand += number;
	}

	chooseOperation(operation) {
		if (this.currentOperand == '' && this.previousOperand == '') {
			return;
		} else if (this.operation == undefined) {
			this.operation = operation;     
			if (this.previousOperand == '') {
				this.previousOperand = this.currentOperand;
				this.currentOperand = '';
			} 
		} else if (this.currentOperand == '' && this.operation != undefined) {
			this.operation = operation; 
		} else {
			this.compute()
			this.operation = operation;
		}
	}

	convertToPercent() {
		if (this.currentOperand == '' && this.operation == undefined) {
			this.previousOperand = (parseFloat(this.previousOperand)/ 100).toString()
		} else if (this.currentOperand != '') {
			this.currentOperand = (parseFloat(this.currentOperand) / 100).toString()
		}
	}

	compute() {
		if(this.currentOperand == '') return; 
	
		const operations = [
			{operator: '+', opFunc: () => parseFloat(this.previousOperand) + parseFloat(this.currentOperand)},
			{operator: '-', opFunc: () =>  parseFloat(this.previousOperand) -  parseFloat(this.currentOperand)},
			{operator: '*', opFunc: () =>  parseFloat(this.previousOperand) *  parseFloat(this.currentOperand)},
			{operator: '/', opFunc: () =>  parseFloat(this.previousOperand) /  parseFloat(this.currentOperand)},
		]

		this.previousOperand = operations.find(op => op.operator == this.operation).opFunc().toString();
		this.operation = undefined;
		this.currentOperand = '';
		
	}

	updateDisplay() {
		this.currOperandtextElement.innerText = this.currentOperand;
		this.prevOperandtextElement.innerText = this.previousOperand;
	}

}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const percentageButton = document.querySelector('[data-percentage]');
const equalButton = document.querySelector('[data-equal]');
const prevOperandtextElement = document.querySelector('[data-prev-operand]');
const currOperandtextElement = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperandtextElement, currOperandtextElement);

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	})
})

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	})
})

equalButton.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay();
})

clearButton.addEventListener('click', ()=> {
	calculator.clear();
	calculator.updateDisplay();
})

deleteButton.addEventListener('click', ()=> {
	calculator.delete();
	calculator.updateDisplay();
})

percentageButton.addEventListener('click', () => {
	calculator.convertToPercent();
	calculator.updateDisplay();
})
