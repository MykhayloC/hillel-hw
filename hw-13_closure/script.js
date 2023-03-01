'use strict';

function sumFunction () {
    let x = 0;
    return function getSum (res = 0) {
        return x += res;
    }
}

const sum = sumFunction();

sum();
sum(10);
sum();
sum(20);
sum(3);
sum(5);
sum(20);
sum(4);

console.log(sum());
