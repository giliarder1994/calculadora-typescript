"use strict";

class Calculator {
    currentInput = "";
    previousInput = "";
    operator = null;
    MAX_DIGITS = 11;
    appendNumber(value) {
        const digitsCount = this.currentInput.replace(",", "").length;
        if (digitsCount >= this.MAX_DIGITS && value !== ",")
            return;
        if (value === ",") {
            if (this.currentInput.includes(","))
                return;
            if (this.currentInput === "") {
                this.currentInput = "0,";
            }
            else {
                this.currentInput += ",";
            }
        }
        else {
            if (this.currentInput === "0") {
                this.currentInput = value;
            }
            else {
                this.currentInput += value;
            }
        }
        this.updateDisplay();
    }
    chooseOperator(operator) {
        if (this.currentInput === "")
            return;
        if (this.previousInput !== "") {
            this.compute();
        }
        this.operator = operator;
        this.previousInput = this.currentInput;
        this.currentInput = "";
        this.updateOperatorDisplay();
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousInput.replace(",", "."));
        const current = parseFloat(this.currentInput.replace(",", "."));
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operator) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "/":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentInput = this.formatResult(computation);
        this.operator = null;
        this.updateOperatorDisplay();
        this.previousInput = "";
        this.updateDisplay();
    }
    updateDisplay() {
        const display = document.getElementById('display');
        display.value = this.currentInput;
    }
    updateOperatorDisplay() {
        const operatorDisplay = document.getElementById("operator-display");
        operatorDisplay.innerText = this.operator ?? "";
    }
    clear() {
        this.currentInput = "";
        this.previousInput = "";
        this.operator = null;
        this.updateDisplay();
        this.updateOperatorDisplay();
    }
    formatResult(value) {
        let text = value.toString().replace(".", ",");
        const digitsOnly = text.replace(",", "");
        if (digitsOnly.length <= this.MAX_DIGITS) {
            return text;
        }
        return value.toExponential(4).replace(".", ",");
    }
}
const calculator = new Calculator();
document.getElementById('buttons').addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains('number')) {
        calculator.appendNumber(target.innerText);
    }
    else if (target.classList.contains('operator')) {
        calculator.chooseOperator(target.innerText);
    }
    else if (target.classList.contains('equals')) {
        calculator.compute();
    }
    else if (target.classList.contains('clear')) {
        calculator.clear();
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        calculator.clear();
    }
    if (event.key === "Enter") {
        calculator.compute();
    }
});
document.addEventListener("keydown", (event) => {
    if (!isNaN(Number(event.key))) {
        calculator.appendNumber(event.key);
    }
    if (["+", "-", "*", "/"].includes(event.key)) {
        calculator.chooseOperator(event.key);
    }
    if (event.key === "Enter") {
        calculator.compute();
    }
    if (event.key === "Escape") {
        calculator.clear();
    }
    if (event.key === "," || event.key === ".") {
        calculator.appendNumber(",");
    }
});
