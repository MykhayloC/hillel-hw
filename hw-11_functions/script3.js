'use strict';

// 3. Написати функцію яка приймає массив чисел та повертає максимальне число в цьому масиві.

const arr = [15, 25, -12, 0, 152, 48];

function calcMax(arrayOfValues) {
    return arrayOfValues.reduce((accumulator, currentValue) => Math.max(accumulator, currentValue));
}

console.log(`Максимальним в масиві [${arr}] є число ${calcMax(arr)}`);