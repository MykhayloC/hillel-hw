'use strict';

const yearOfBirth = +prompt('В якому році Ви народились?');
if (!yearOfBirth || yearOfBirth < 1900 || yearOfBirth > 2022) {
    alert(`Шкода, що Ви не захотіли вказати рік свого народження...`)
}

const cityOfResidence = prompt('В якому місті Ви мешкаєте?');
if (!cityOfResidence) {
    alert(`Шкода, що Ви не захотіли вказати місто свого проживання...`);
}

const favoriteSport = prompt('Який Ваш улюблений вид спорту?');
if (!favoriteSport) {
    alert(`Шкода, що Ви не захотіли вказати свій улюблений вид спорту...`);
}

const ageOfUser = 2023 - yearOfBirth;

const ageOfUserCheck = ageOfUser % 10;

let ageOfUserMessage = 'років';

if (ageOfUserCheck === 1 ) {
    ageOfUserMessage = 'рік';
} else if (ageOfUserCheck > 1 && ageOfUserCheck < 5) {
    ageOfUserMessage = 'роки';
}

let cityOfUserMessage;

switch (cityOfResidence) {
    case 'Київ':
        cityOfUserMessage = 'Ви живете у столиці України!';
        break;
    case 'Вашингтон':
        cityOfUserMessage = 'Ви живете у столиці США!';
        break;
    case 'Лондон':
        cityOfUserMessage = 'Ви живете у столиці Великобританії!';
        break;
    default:
        cityOfUserMessage = `Ви живете у місті ${cityOfResidence}`;
}

let kindOfSport;

if (favoriteSport && favoriteSport.toLowerCase() === 'футбол') {
    kindOfSport = 'Круто! Хочете стати Мессі?';
} else if (favoriteSport && favoriteSport.toLowerCase() === 'бокс') {
    kindOfSport = 'Круто! Хочете стати Кличко?';
} else if (favoriteSport && favoriteSport.toLowerCase() === 'гольф') {
    kindOfSport = 'Круто! Хочете стати Вудсом?';
} else {
    kindOfSport = `${favoriteSport} - прикольний вид спорту!`;
}

let firstMessage;
let secondMessage;
let thirdMessage;

if (yearOfBirth && yearOfBirth >= 1900 && yearOfBirth <= 2022) {
    firstMessage = `Вам ${ageOfUser} ${ageOfUserMessage}`;
} else {
    firstMessage = `Ваш вік невідомий`;
}
if ((typeof cityOfResidence === "string") && cityOfResidence.trim()) {
    secondMessage = cityOfUserMessage;
} else {
    secondMessage = `Місто Вашого проживання невідоме`;
}
if ((typeof favoriteSport === "string") &&favoriteSport.trim()) {
    thirdMessage = kindOfSport;
} else {
    thirdMessage = `Ваш улюблений вид спорту невідомий`;
}

alert(`${firstMessage} \n${secondMessage} \n${thirdMessage}`);
