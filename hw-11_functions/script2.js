'use strict';

/*
    2. Написати функцію doMath(x, znak, y), яка отримує 3 аргументи: числа x і y, рядок znak.
       У змінній znak може бути: +, -, *, /, %, ^ (ступінь ).
       Вивести результат математичної дії, вказаної в змінній znak.Обидва числа і знак виходять від користувача.
*/

const firstNumFromUser = prompt(`Введіть перше число:`);
let firstNum;
if (firstNumFromUser !== null) firstNum = +firstNumFromUser;
const secondNumFromUser = prompt(`Введіть друге число:`);
let secondNum;
if (secondNumFromUser !== null) secondNum = +secondNumFromUser;
const sign = prompt(`Введіть знак дії, яку необхідно виконати з введеними числами (+, -, *, /, %, ^):`);

function doMath(x, znak, y) {
    switch (znak) {
        case '+': return x + y;
        case '-': return x - y;
        case '*': return x * y;
        case '/': return x / y;
        case '%': return x % y;
        case '^': return x ** y;
        default: return false;
    }
}

((typeof firstNum === 'number') && (typeof secondNum === 'number') && doMath(firstNum, sign, secondNum)) ?
    console.log(doMath(firstNum, sign, secondNum)) : console.log(`Було введено некоректні дані`);
