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
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '×') {
        return multiply(num1, num2);
    } else if (operator === '÷') {
        return divide(num1, num2);
    }
}


const output = document.getElementById('output-text');
const buttons = document.getElementsByTagName('button');
const allClear = document.getElementById('all-clear');
const operators = document.getElementsByClassName('operator');
const decPoint = document.getElementById('dec-point');

const disableDecPoint = value => {
    if (value.includes('.')) {
        decPoint.disabled = true;
    }
}

const enableDecPoint = () => {
    decPoint.disabled = false;
}

const buttonClicks = () => {
    for (let i = 0; i < buttons.length; i++) {
        let buttonText = buttons[i].textContent;
        buttons[i].addEventListener('click', () => {
            if (buttons[i].className.includes('number')) {
                if (firstOperator === null) {
                    if (firstNum === null) {
                        firstNum = '';
                    }
                    // when firstOperator is equal to null any buttons that are clicked
                    // with 'number' in the className are assigned to firstNum
                    enableDecPoint();
                    firstNum += buttonText;
                    disableDecPoint(firstNum);
                    console.log('firstNum:', firstNum);
                    output.textContent = firstNum;
                } else {
                    if (secondNum === null) {
                        secondNum = '';
                    }
                    // when firstOperator has a truthy value the next buttons that are clicked
                    // with 'number' in the className are assigned to secondNum
                    enableDecPoint();
                    secondNum += buttonText;
                    disableDecPoint(secondNum);
                    console.log('secondNum:', secondNum)
                    output.textContent = secondNum;
                }
            } else if (
                buttonText.includes('÷') ||
                buttonText.includes('×') ||
                buttonText.includes('-') ||
                buttonText.includes('+')) {
                    // assign firstOperator to the textContent of the button that was clicked
                    // if the textContent includes one of the operators listed
                    firstOperator = buttonText;
                    console.log(firstOperator);
            } else if (buttonText === 'AC') {
                clearDisplay();
            } else if (buttonText.includes('=')) {
                let result = operate(firstOperator, firstNum, secondNum);
                console.log(result);
                output.textContent = result;
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
    enableDecPoint();
}