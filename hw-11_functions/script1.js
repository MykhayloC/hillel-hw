'use strict';

// 1. Дано масив з елементами різних типів. Створити функцію яка вираховує середнє арифметичне лише числових елементів даного масиву

const arr = [5, 10, 'string', '  ', null, 12, true, 167];

let result = (arrayOfValues) => {
    let i = 0;
    let sum = 0;
    arrayOfValues.forEach((item) => {
        if (typeof item === "number") {
        ++i;
        sum += item
    }});
    return sum / i;
};

console.log(`\n1. Дано масив з елементами різних типів. Створити функцію яка вираховує середнє арифметичне лише числових елементів даного масиву\n`)
console.log(`Масив елементів:`);
console.log(arr);
console.log(`\nСереднє арифметичне значення числових елементів даного масиву дорівнює ${result(arr)}`);
