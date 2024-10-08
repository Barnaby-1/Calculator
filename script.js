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
let result = null;
let calculationDone = null;

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


const buttonClicks = () => {
    for (let i = 0; i < buttons.length; i++) {
        let buttonText = buttons[i].textContent;
        buttons[i].addEventListener('click', () => {
            // assigns true to calculationDone when firstOperator is falsy
            // to make it so when a calculation needs to be done with a previous
            // result calculationDone stays as false
            disableButtons();
            if (buttonText === 'AC') {
                clearDisplay();
            } else if (buttons[i].className.includes('number')) {
                if (firstOperator === null) {
                    if (firstNum === null) {
                        firstNum = '';
                    } else if (firstNum.length > 0) {
                        calculationDone = false;
                    } else {
                        calculationDone = true;
                    }
                    // when firstOperator is equal to null any buttons that are clicked
                    // with 'number' in the className are assigned to firstNum
                    result = null;
                    enableDecPoint();
                    disableButtons();
                    firstNum += buttonText;
                    disableDecPoint(firstNum);
                    output.textContent = firstNum;
                } else {
                    if (secondNum === null) {
                        secondNum = '';
                    }
                    // when firstOperator has a truthy value the next buttons that are clicked
                    // with 'number' in the className are assigned to secondNum
                    enableDecPoint();
                    disableButtons();
                    secondNum += buttonText;
                    disableDecPoint(secondNum);
                    output.textContent = secondNum;
                }
                if (calculationDone) {
                    // reset variables when a calculation has been done to prevent
                    // firstNum from adding to what has already been output
                    // converts firstNum to an array and removes all the elements
                    // apart from the last one which is the new firstNum
                    firstNum = firstNum.split('');
                    firstNum = firstNum.splice(firstNum.length - 1, 1);
                    firstOperator = null;
                    output.textContent = firstNum;
                    calculationDone = false;
                }
            } else if (buttonText.includes('=')) {
                if ((firstNum === 'Not a number' || result === 'Not a number') && secondNum && firstOperator) {
                    result = 'Not a number';
                    output.textContent = result;
                    setNull();
                    firstNum = result;
                } else if (!firstNum && firstOperator && secondNum) {
                    result = parseFloat(operate(firstOperator, firstNum, secondNum).toFixed(5));
                    if (result === null || result === NaN || result === Infinity || (secondNum === '0' && firstOperator === '÷')) {
                        result = 'Not a number';
                    }
                    output.textContent = result;
                    setNull();
                    firstNum = result;
                } else if (!secondNum && firstOperator && firstNum) {
                    // calculate result when '=' is clicked when secondNum is a falsy value
                    result = parseFloat(operate(firstOperator, firstNum, firstNum).toFixed(5));
                    if (result === null || result === NaN || result === Infinity) {
                        result = 'Not a number';
                    }
                    output.textContent = result;
                    setNull();
                } else if (firstOperator && firstNum && secondNum) {
                    // calculate result when firstOperator, firstNum and secondNum are all truthy
                    result = parseFloat(operate(firstOperator, firstNum, secondNum).toFixed(5));
                    if (result === null || result === NaN || result === Infinity) {
                        result = 'Not a number';
                    }
                    output.textContent = result;
                    setNull();
                    firstNum = result;
                }
            } else if (firstOperator && firstNum && secondNum) {
                if (
                    buttonText.includes('÷') ||
                    buttonText.includes('×') ||
                    buttonText.includes('-') ||
                    buttonText.includes('+')) {
                        // calculate the result when firstOperater, firstNum and secondNum are true and
                        // if either ÷, ×, - or + are clicked and round to 5 decimal places excluding 0s on the end
                        result = parseFloat(operate(firstOperator, firstNum, secondNum).toFixed(5));
                        output.textContent = result;
                        setNull();
                        firstOperator = buttonText;
                        firstNum = result;
                }
            } else if (buttonText.includes('-') && firstNum === null) {
                // assigns '-' to firstNum if '-' is the first button pressed and firstNum is equal to null
                firstNum = '-';
            } else if (
                buttonText.includes('÷') ||
                buttonText.includes('×') ||
                buttonText.includes('-') ||
                buttonText.includes('+')) {
                // assign firstOperator to the textContent of the button that was clicked
                // if the textContent includes one of the operators listed
                if (firstNum === null) {
                    firstNum = 0;
                }
                firstOperator = buttonText;
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
    result = null;
    enableDecPoint();
    calculationDone = false;
}

const setNull = () => {
    firstNum = null;
    secondNum = null;
    firstOperator = null;
}

const disableDecPoint = value => {
    if (value.includes('.')) {
        decPoint.disabled = true;
    }
}

const enableDecPoint = () => {
    decPoint.disabled = false;
}

const disableButtons = () => {
    // disables the number buttons if the amount of characters in the output text is equal to 10
    for (let i = 0; i < buttons.length; i++) {
        if (output.textContent.length === 10 && buttons[i].className.includes('number')) {
            buttons[i].disabled = true;
            disableDecPoint(firstNum);
        } else {
            buttons[i].disabled = false;
        }
    }
}