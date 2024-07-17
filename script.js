let currentValue = ''
let previousValue = ''
let operator = ''

document.addEventListener('DOMContentLoaded', function() {
    let clear = document.querySelector('.clear');
    let equal = document.querySelector('.equals');
    let decimal = document.querySelector('.decimal');

    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operators');

    let previousScreen = document.querySelector('.previous');
    let currentScreen = document.querySelector('.current');

    numbers.forEach((number) => number.addEventListener('click', function(e) {
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue
    })) 

    operators.forEach((op) => op.addEventListener('click', function(e) {
        handleOpperator(e.target.textContent)
        previousScreen.textContent = previousValue + ' ' + operator
        currentScreen.textContent = currentValue
    }))

    clear.addEventListener('click', function() {
        previousValue = ''
        currentValue = ''
        operator = ''
        currentScreen.textContent = currentValue
        previousScreen.textContent = currentValue
    })

    equal.addEventListener('click', function() {
        if (currentValue != '' && previousValue != ''){
            calculate()
            previousScreen.textContent = ''
            if (previousValue.length <= 5) {
            currentScreen.textContent = previousValue
            } else {
            currentScreen.textContent = previousValue.slice(0,5) + '...'
            }
        }
    })

    decimal.addEventListener('click', function() {
        addDecimal()
    })

})


function handleNumber(num) {
    if (currentValue.length <= 5) {
        currentValue += num;
    }
}

function handleOpperator(op) {
    operator = op
    previousValue = currentValue
    currentValue = ''
}

function calculate() {
    previousValue = Number(previousValue)
    currentValue = Number(currentValue)

    if (operator === '+') {
        previousValue += currentValue
    } else if (operator === '-') {
        previousValue -= currentValue
    } else if (operator === 'x') {
        previousValue *= currentValue
    } else if (operator === '/') {
        previousValue /= currentValue
    }

    previousValue = roundNumber(previousValue)
    previousValue = previousValue.toString()
    currentValue = previousValue.toString()
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000
}

function addDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.'
    }
}