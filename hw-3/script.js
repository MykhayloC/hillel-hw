'use strict';

const firstNum = +prompt(`Введіть перше число:`);
const secondNum = +prompt(`Введіть друге число:`);

const sum = firstNum + secondNum;
const difference = firstNum - secondNum;
const multiplication = firstNum * secondNum;
const division = firstNum / secondNum;

alert (`• ${firstNum} + ${secondNum} = ${sum}
• ${firstNum} - ${secondNum} = ${difference}
• ${firstNum} * ${secondNum} = ${multiplication}
• ${firstNum} / ${secondNum} = ${division}`);
