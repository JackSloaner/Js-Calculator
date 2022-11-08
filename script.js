let currentNum = 0;
let newNum = '0';
let newOperator = '';
let currentOperator = '';

const output = document.querySelector('.output');
const mini = document.querySelector('.mini-output')
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete')
const equals = document.querySelector('.equals')
const decimal = document.querySelector('.decimal')
const plusMinus = document.querySelector('.plus-minus')

clear.addEventListener('click', clearOutput);
del.addEventListener('click', deleteOutput);
equals.addEventListener('click', equalOperate);
decimal.addEventListener('click', addDecimal)
plusMinus.addEventListener('click', switchSymbol)

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')

numbers.forEach((number) => {
    number.addEventListener('click', numberPressed)
})

operators.forEach((operator) => {
    operator.addEventListener('click', operate)
})

function clearOutput(){
}

function deleteOutput(){
    newNum = newNum.substr(0, newNum.length - 1);
    if (newNum === '') newNum = '0';
    output.textContent = newNum;
}

function equalOperate(){
}

function addDecimal(){
}

function switchSymbol(){
}

function numberPressed(e){
    if (!newOperator) { 
        const num = e.target.id;
        (newNum != '0') ? newNum += num: newNum = num;
        output.textContent = newNum;
    } else {
        currentOperator = newOperator;
        newOperator = '';
        mini.textContent = `${newNum} ${currentOperator}`;
        currentNum = parseFloat(newNum);
        newNum = e.target.id;
        output.textContent = newNum;
    }
}

function operate(e){
    newOperator = e.target.id;
}