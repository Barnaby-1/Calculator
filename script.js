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

let firstNum = null;
let firstOperator = null;
let secondNum = null;

const operate = (operator, num1, num2) => {
    if (operator === '+') {
        add(num1, num2);
    } else if (operator === '-') {
        subtract(num1, num2);
    } else if (operator === '×') {
        multiply(num1, num2);
    } else if (operator === '÷') {
        divide(num1, num2);
    }
}


const output = document.getElementById('output-text');
const buttons = document.getElementsByTagName('button');
const allClear = document.getElementById('all-clear');
const operators = document.getElementsByClassName('operator');

const buttonClicks = () => {
    for (let i = 0; i < buttons.length; i++) {
        let buttonText = buttons[i].textContent;
        buttons[i].addEventListener('click', () => {
            if (buttons[i].className.includes('number')) {
                if (firstNum === null && secondNum === null) {
                    firstNum = '';
                    secondNum = '';
                }
                // when a number is clicked assign firstNum to the textContent of the button and display the number
                firstNum += buttonText;
                console.log(firstNum);
                output.textContent = firstNum;
            } else if (
                // assign firstOperator to the textContent of the button that was clicked
                // and if the textContent includes one of the operators listed
                buttonText.includes('÷') ||
                buttonText.includes('×') ||
                buttonText.includes('-') ||
                buttonText.includes('+') ||
                buttonText.includes('=')) {
                    firstOperator = buttonText;
                    console.log(firstOperator);
            } else if (buttonText === 'AC') {
                clearDisplay();
            }
        })
    }
}
buttonClicks();


const clearDisplay = () => {
    output.textContent = '0';
    firstNum = null;
    firstOperator = null;
    secondNum = null;
}