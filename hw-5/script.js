'use strict';

const firstNum = +prompt('Введіть перше число:');
const secondNum = +prompt('Введіть друге число:');
const thirdNum = +prompt('Введіть третє число:');

const  arithmeticMean = (firstNum + secondNum + thirdNum) / 3;

alert(`Середнє арифметичне значення введених чисел складає: ${arithmeticMean}`);
