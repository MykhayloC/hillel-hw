'use strict';

function power(x, n) {
    if (n === 1) {
        return x;
    } else return x * power(x, n-1);
}

const x = 2;
const n = 5;

console.log(`${x} в супеню ${n} дорівнює ${power(x, n)}`)
