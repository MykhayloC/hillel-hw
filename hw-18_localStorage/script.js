'use strict';

import {handlerNames, createButton, generateCategories, showOrders} from "./generateHTML.js";

const mainContainer = document.querySelector('.main-container');
const leftColHead = document.getElementById('left-head');
const centerColHead = document.getElementById('center-head')
const rightColHead = document.getElementById('right-head');
const leftColBody = document.getElementById('left-body');
const centerColBody = document.getElementById('center-body');
const rightColBody = document.getElementById('right-body');
const buttonsContainer = document.querySelector('.buttons-container');

const borderedElementStyle = ' bordered';

generateCategories();

const categoryNames = document.getElementById('left-body').querySelectorAll('p');
categoryNames.forEach(item => item.addEventListener("click", handlerNames));

const orderButtonText = "Show orders";
const ordersButton = createButton('button', buttonsContainer, orderButtonText, 'order-button', 'button');

ordersButton.addEventListener('click', showOrders, {once: true});



export {mainContainer, centerColHead, centerColBody, borderedElementStyle, rightColHead, rightColBody, leftColHead, leftColBody};
