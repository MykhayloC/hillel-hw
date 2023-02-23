'use strict';

let arrayLength;
let arr = [];
let arrStr = [];
let arrNum = [];

arrayLength = +prompt('Введіть довжину масиву (довжина має бути не менше 4):');

for (let i = 0; i < arrayLength; i++) {
    let arrayN;
    arrayN = prompt(`Введіть ${i+1}-й елемент масиву:`);
    if (arrayN === null) {
        console.log(`Введено некоректні дані!`);
        break;
    } else if (isNaN(+arrayN)) {
        arr.push(arrayN);
        arrStr.push(arrayN);
    } else {
        arr.push(+arrayN);
        arrNum.push(+arrayN)
    }

    console.log(arr);
}

arrNum.sort((a, b) => a - b);
arrStr.sort( (a, b) => a.localeCompare(b));

arr = arrNum.concat(arrStr);
console.log(arr);

arr.splice(1, 3);
console.log(arr);
