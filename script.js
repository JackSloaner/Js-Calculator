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
    resetDefaults('newNum', 'equalPair', 'newOperator', 'currentNum', 'currentOperator', 'decimal', 'mini');
    output.textContent = newNum;
}

function deleteOutput(){
    if(typeof(newNum) === 'string'){
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
    resetDefaults('equalPair');
    resetClickAnimation();
    const num = '0.'
    if (!newOperator) {
        if(output.textContent.length >= 11) return;
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
    let newString = newNum + '';
    if (output.textContent.indexOf('-') > -1){
        newString = newNum + '';
        newString = newString.substr(1);
        output.textContent = newNum
    } else {
        newString = '-' + newNum;
        output.textContent = newNum
    }
    if (typeof(newNum) === 'number') {
        newNum = parseFloat(newString)
    } else {
        newNum = newString;
    }
    output.textContent = newNum;
}

function numberPressed(e){
    resetDefaults('equalPair');
    resetClickAnimation();
    const num = e.target.id;
    if (!newOperator) {
        if(output.textContent.length >= 12) return;
        if (typeof(newNum) === 'string'){
            (newNum != '0') ? newNum += num: newNum = num;
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
    mini.textContent += newNum;
    output.textContent = newNum;
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
    })
}

function resetClickAnimation() {
    const clicked = document.querySelector('.clicked');
    if (clicked) clicked.classList.remove('clicked')
}

function roundValue(num){
    const roundPrecision = 11 - findDigitsBeforeDecimal(num);
}

function findDigitsBeforeDecimal(num){
    let modNumber = 10 ** 10;
    let newAbs = Math.abs(num);
    newAbs = newAbs - newAbs % 1;
    let loopCounter = 0;
    let digitCount = 11;
    for(let i = modNumber; i > 0; i = i / 10){
        let modded = newAbs % i;
        if (modded != newAbs) {
            digitCount -= loopCounter;
            break;
        }
        loopCounter++;
    }
    return digitCount;
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
