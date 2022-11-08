let currentNum = 0;
let newNum = '0';
let newOperator = '';
let currentOperator = '';

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
    resetDefaults('newNum', 'newOperator', 'currentNum', 'currentOperator', 'decimal', 'mini');
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
    if (currentOperator){
        displayOperation();
        resetDefaults('newOperator', 'currentOperator', 'currentNum'); // change function so that you can keep clicking = button*
        decimal.disabled = false;
    }
}

function addDecimal(e){
    if (typeof(newNum) === 'string') {
        newNum += '.'
        output.textContent = newNum;
        e.target.disabled = true;
    } else {
        resetDefaults('mini', 'newNum')
        newNum += '.';
        output.textContent = newNum
        e.target.disabled = true;
    }
}

function switchSymbol(){

}

function numberPressed(e){
    if (!newOperator) { 
        const num = e.target.id;
        if (typeof(newNum) === 'string'){
            (newNum != '0') ? newNum += num: newNum = num;
            output.textContent = newNum;
        } else {
            newNum = num;
            output.textContent = newNum;
            resetDefaults('mini');
        }
    } else {
        currentOperator = newOperator;
        resetDefaults('newOperator');
        mini.textContent = `${newNum} ${currentOperator}`;
        currentNum = parseFloat(newNum);
        newNum = e.target.id;
        output.textContent = newNum;
        decimal.disabled = false;
    }
}

function operate(e){
    newOperator = e.target.id;
    if (currentOperator){
        displayOperation()
        resetDefaults('currentNum', 'currentOperator')
    }
}

function displayOperation() {
    mini.textContent = `${currentNum} ${currentOperator} ${newNum} = `
    const newFloat = parseFloat(newNum);
    newNum = operation(currentNum, newFloat, currentOperator);
    mini.textContent += newNum;
    output.textContent = newNum;
}

function resetDefaults(...variables){
    variables.forEach((argument) => {
        if (argument === 'currentNum') {currentNum = 0;}
        else if (argument === 'currentOperator') {currentOperator = '';}
        else if (argument === 'newNum') {newNum = '0';}
        else if (argument === 'newOperator') {newOperator = '';}
        else if (argument === 'decimal'){decimal.disabled = false;}
        else if (argument === 'mini') {mini.textContent = ''}
    })
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