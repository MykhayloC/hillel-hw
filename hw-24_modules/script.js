'use strict';

import {sum, division, difference, multiplication} from "./calculator.js";

const inputValue = $('.calculator-screen');
$('.btn-light').on('click', (e) => {
    if (e.target.value === "0" && inputValue.val().charAt(0) === "0" && inputValue.val().charAt(1) !== ".") {
        return;
    } else if (inputValue.val().length < 15) {
        inputValue.val(inputValue.val().concat(e.target.value));
    }
});

$('.all-clear').on('click', () => location.reload());

$('.decimal').on('click', (e) => {
    if (inputValue.val() && !inputValue.val().includes(".")) {
        inputValue.val(inputValue.val().concat(e.target.value));
     }
});

$('.operator').on('click', (e) => {
    switch (e.target.value) {
        case "+":
            calculate(sum);
            break;
        case "-":
            calculate(difference);
            break;
        case "*":
            calculate(multiplication);
            break;
        case "/":
            calculateDivision();
            break;
    }
})

function calculate(operation) {
    if (inputValue.val() !== "") {
        const firstNum = +inputValue.val();
        inputValue.val("");
        $('.equal-sign').on('click', () => {
            const secondNum = +inputValue.val();
            inputValue.val(operation(firstNum, secondNum));
        })
    }
}

function calculateDivision() {
    if (inputValue.val() !== "") {
        const firstNum = +inputValue.val();
        inputValue.val("");
        $('.equal-sign').on('click', () => {
            const secondNum = +inputValue.val();
            (secondNum !== 0) ? inputValue.val(division(firstNum, secondNum)) : inputValue.val("Error!");
        })
    }
}
