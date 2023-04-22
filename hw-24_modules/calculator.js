'use strict';

const errorMessage = "Non-displayable!"
function sum(a, b) {
    const result = a + b;
    if (result.toString().length > 15) {
        return errorMessage;
    } else return a + b;
}

function difference(a, b) {
    const result = a - b;
    if (result.toString().length > 15) {
        return errorMessage;
    } else return a - b;
}

function multiplication(a, b) {
    const result = a * b;
    if (result.toString().length > 15) {
        return errorMessage
    } else return a * b;
}

function division(a, b) {
    const result = a / b;
    if (result.toString().length > 15) {
        return errorMessage
    } else return a / b;
}

export {sum, division, difference, multiplication};
