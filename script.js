let currentNum = 0;
let newNum = '0';
let newOperator = '';
let currentOperator = '';
let equalPair = ['', ''];

const output = document.querySelector('.output');
const mini = document.querySelector('.mini-output');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const plusMinus = document.querySelector('.plus-minus');

clear.addEventListener('click', clearOutput);
del.addEventListener('click', deleteOutput);
equals.addEventListener('click', equalOperate);
decimal.addEventListener('click', addDecimal);
plusMinus.addEventListener('click', switchSymbol);

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

numbers.forEach((number) => {
    number.addEventListener('click', numberPressed);
})

operators.forEach((operator) => {
    operator.addEventListener('click', operate);
})

function clearOutput(){
    resetClickAnimation();
    resetDefaults('newNum', 'equalPair', 'newOperator', 'currentNum', 'currentOperator', 'decimal', 'mini', 'operators');
    output.textContent = newNum;
}

function deleteOutput(){
    if (newOperator) return;
    resetDefaults('operators')
    if(typeof(newNum) === 'string'){
        if (newNum[newNum.length - 1] === '.') resetDefaults('decimal');
        newNum = newNum.substr(0, newNum.length - 1);
        if (newNum === '') newNum = '0';
        output.textContent = newNum;
    }
}

function equalOperate(){
    if (equalPair[0]){
        displayOperation(true)
    } else if (currentOperator){
            displayOperation();
            resetDefaults('newOperator', 'currentOperator', 'currentNum', 'decimal'); 
        }
        
}

function addDecimal(e){
    resetDefaults('equalPair', 'operators');
    resetClickAnimation();
    const num = '0.'
    if (!newOperator) {
        if (maxLengthReached(true)) return;
        if (typeof(newNum) === 'string') {
            newNum += '.'
            output.textContent = newNum;
            e.target.disabled = true;
        } else {
            resetDefaults('mini', 'newNum');
            newNum += '.';
            output.textContent = newNum;
            e.target.disabled = true;
        }
    } else{
        currentOperator = newOperator;
        resetDefaults('newOperator');
        mini.textContent = `${newNum} ${currentOperator}`;
        currentNum = parseFloat(newNum);
        newNum = num;
        output.textContent = newNum;
        e.target.disabled = true;
    }
}

function switchSymbol(){
    resetDefaults('equalPair', 'operators');
    resetClickAnimation();
    if (!newOperator && output.textContent != 'ERROR') {
        let newString = output.textContent + '';
        if (newString.indexOf('-') === 0){
            newString = newString.substr(1);
        } else {
            newString = '-' + newString
        }
        newNum *= -1;
        output.textContent = newString;

        if (newString.indexOf('e') === -1){
            if (typeof(output.textContent) === 'number') {
                newNum = parseFloat(newString)
            } else {
                newNum = newString;}
                output.textContent = newNum;
        }
    } else if (output.textContent != 'ERROR'){
        currentOperator = newOperator;
        resetDefaults('newOperator');
        mini.textContent = `${newNum} ${currentOperator}`;
        currentNum = parseFloat(newNum);
        newNum = '-0';
        output.textContent = newNum;
    } else{
        newNum = '-0';
        output.textContent = newNum;
    }
}

function numberPressed(e){
    resetDefaults('equalPair', 'operators');
    resetClickAnimation();
    const num = e.target.id;
    if (!newOperator) {
        if(maxLengthReached()) return;
        if (typeof(newNum) === 'string'){
            if (newNum === '0'){
                newNum = num;
            } else if (newNum === '-0') {
                newNum = '-' + num
            } else {
                newNum += num
            }
            output.textContent = newNum;
        } else {
            newNum = num;
            output.textContent = newNum;
            resetDefaults('mini', 'decimal');
        }
    } else {
        currentOperator = newOperator;
        resetDefaults('newOperator');
        mini.textContent = `${newNum} ${currentOperator}`;
        currentNum = parseFloat(newNum);
        newNum = num;
        output.textContent = newNum;
    }
}

function operate(e){
    resetDefaults('equalPair', 'decimal');
    resetClickAnimation();
    newOperator = e.target.id;
    if (currentOperator){
        displayOperation();
        resetDefaults('currentNum', 'currentOperator');
    }
    e.target.classList.add('clicked')
}

function displayOperation(equalsOperation) {
    if (equalsOperation){
        mini.textContent = `${newNum} ${equalPair[1]} ${equalPair[0]} = `
        newNum = operation(newNum, equalPair[0], equalPair[1])
    }else{
        mini.textContent = `${currentNum} ${currentOperator} ${newNum} = `
        const newFloat = parseFloat(newNum);
        equalPair[0] = newFloat;
        equalPair[1] = currentOperator;
        newNum = operation(currentNum, newFloat, currentOperator);
    }
    if (Math.abs(newNum) === Infinity || isNaN(newNum)) {
        output.textContent = 'ERROR';
        resetDefaults('equalPair', 'newOperator', 'currentNum', 'currentOperator', 'newNum', 'decimal', 'mini')
        operators.forEach(operator => {operator.disabled = true});
    } else{
        const truncatedNum = truncateValue(newNum);
        mini.textContent += truncatedNum;
        output.textContent = truncatedNum;
    }
}

function resetDefaults(...variables){
    variables.forEach((argument) => {
        if (argument === 'currentNum') {currentNum = 0;}
        else if (argument === 'currentOperator') {currentOperator = '';}
        else if (argument === 'newNum') {newNum = '0';}
        else if (argument === 'equalPair') {equalPair[0] = ''; equalPair[1] = '';}
        else if (argument === 'newOperator') {newOperator = '';}
        else if (argument === 'decimal'){decimal.disabled = false;}
        else if (argument === 'mini') {mini.textContent = ''}
        else if (argument === 'operators') {operators.forEach(operator => {operator.disabled = false})};
    })
}

function resetClickAnimation() {
    const clicked = document.querySelector('.clicked');
    if (clicked) clicked.classList.remove('clicked')
}

function truncateValue(num){
    let numToString = num + '';
    let ePosition = numToString.indexOf('e');
    if (numToString.indexOf('.') > -1) {
        if (ePosition === -1) {
            num = roundValue(num, numToString);
        } else { 
            let decimalPart = numToString.substr(0, ePosition);
            let restOfNum = numToString.substr(ePosition);
            if (numToString.indexOf('+') > -1) restOfNum = restOfNum.substr(0, 1) + restOfNum.substr(2)

            decimalPart = roundValue(decimalPart, numToString, restOfNum.length);
            if (Math.abs(decimalPart) === 10) {
                decimalPart /= 10;
                restOfNum = 'e' + (parseFloat(restOfNum.substr(1)) + 1);
            }
            num = decimalPart + restOfNum;
            return num;
        }
    }
    let maxLength = 11;
    if (numToString.indexOf('-') === -1) maxLength++;
    if (findDigitsBeforeDecimal(num) > maxLength) num = reduceValue(num, numToString);
    return num;
}

function reduceValue(num, numToString){
    let numDigits = findDigitsBeforeDecimal(num);
    let extraCharacter = 0;
    let decimalPosition = 1; 
    if (numToString.indexOf('-') > -1) {
        extraCharacter++;
        decimalPosition++;
    };
    
    let truncated = numToString.substr(0, 8 + extraCharacter);

    truncated = truncated.substr(0, decimalPosition) + '.' + truncated.substr(decimalPosition);
    num = truncated + 'e' + numDigits;
    return num;
}

function roundValue(num, numToString, largeNumDigits){
    const dotPosition = numToString.indexOf('.');
    const containsNegative = numToString.indexOf('-') === 0;

    const digitCount = findDigitsBeforeDecimal(num);

    let roundPrecision = 11 - digitCount;
    let numberOfCharacters = 12;
    let roundReference = (10 ** (-roundPrecision)) * 0.5;
    if (containsNegative) numberOfCharacters++;

    if (digitCount <= 20 && digitCount > 10){
        numberOfCharacters = dotPosition;
        roundReference = 0.5;
    } else if (largeNumDigits){
        numberOfCharacters -= largeNumDigits;
        roundReference /= 10 ** (-largeNumDigits);
    }
    
    
    let truncated = parseFloat(numToString.substr(0, numberOfCharacters));
    const rest = Math.abs(num) - Math.abs(truncated);

    if (rest >= roundReference) {
        if(!containsNegative) {
            truncated += 2 * roundReference;
        } else{
            truncated -= 2 * roundReference;
        }
        truncated = truncateValue(truncated);
    } 
    return truncated;
}

function findDigitsBeforeDecimal(num){
    let absNum = Math.abs(num);
    absNum = absNum - absNum % 1;
 
    if (absNum === 0) return 1;

    let keepGoing = true;
    let i = 1;
    let digitCount = 0;
    while(keepGoing){
        if (i > absNum){
            return digitCount
        }
        i *= 10;
        digitCount++;
    }
    return digitCount;
}

function maxLengthReached(isDecimal){
    let result;
    let maxLength;
    (isDecimal) ? maxLength = 11: maxLength = 12;
    if (output.textContent.indexOf('-') > -1) maxLength++;
    result = output.textContent.length >= maxLength;
    return result;
}

function operation(a, b, op) {
    switch(op){
        case '+': 
            return a + b;
        break;
        case '-':
            return a - b;
        break;
        case '*':
            return a * b;
        break;
        case '/':
            return a / b;
        break;
        default: 
    }
}
