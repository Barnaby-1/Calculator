// basic math functions

const add = (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1, num2) => {
    return num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const divide = (num1, num2) => {
    return num1 / num2;
}

let firstNum = 0;
let firstOperator;
let secondNum = 0;

const operate = (operator, num1, num2) => {
    if (operator === '+') {
        add(num1, num2);
    } else if (operator === '-') {
        subtract(num1, num2);
    } else if (operator === '*') {
        multiply(num1, num2);
    } else if (operator === '/') {
        divide(num1, num2);
    }
}


const output = document.getElementById('output-text');
const buttons = document.getElementsByTagName('button');
const allClear = document.getElementById('all-clear');
const operators = document.getElementsByClassName('operator');

const buttonClicks = () => {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            output.textContent = buttons[i].textContent;
        })
    }
}
buttonClicks();