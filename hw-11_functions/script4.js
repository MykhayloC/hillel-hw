'use strict';

/*
    4. Створити функцію, яка прибирає з рядка всі символи, які ми передали другим аргументом.
       'func(" hello world", ['l', 'd'])' поверне нам "heo wor".
       Вихідний рядок та символи для видалення задає користувач.
*/

let stringFromUser = prompt('Введіть рядок, з якого необхідно прибрати символи:');
let stringFromUserInLowerCase;
if (stringFromUser !== null) stringFromUserInLowerCase = stringFromUser.toLowerCase();
let symbolsToReplaceFromUser = prompt('Введіть через пробіл символи, які небхідно прибрати із введеного рядка:')
let symbolsToReplace;
if (symbolsToReplaceFromUser !== null) symbolsToReplace = symbolsToReplaceFromUser.toLowerCase().split(' ');

function changeString(stringToChange, symbols) {
    symbols.forEach((item) => stringToChange = stringToChange.replaceAll(`${item}`, ''));
    return stringToChange;
}

const resultOfChanging = changeString(stringFromUserInLowerCase, symbolsToReplace);

if (typeof stringFromUser !== "string" || typeof symbolsToReplaceFromUser !== "string") {
    console.log('Введено некоректні дані!');
} else if (stringFromUserInLowerCase === resultOfChanging) {
    console.log(stringFromUser)
} else console.log(resultOfChanging);
