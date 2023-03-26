'use strict';

import {categories} from "./data.js";
import {createList, handlerNames} from "./generateHTML.js";

const mainContainer = document.querySelector('.main-container');
const formContainer = document.querySelector('.form-container');
const formBodyContainer = document.querySelector('.form-body');
const leftColHead = document.getElementById('left-head');
const centerColHead = document.getElementById('center-head')
const rightColHead = document.getElementById('right-head');
const leftColBody = document.getElementById('left-body');
const centerColBody = document.getElementById('center-body');
const rightColBody = document.getElementById('right-body');

const borderedElementStyle = ' bordered';

leftColHead.className += borderedElementStyle;
const h2LeftColHead = document.createElement('h2');
h2LeftColHead.className = 'catalog-header';
h2LeftColHead.innerHTML = "Categories";
leftColHead.append(h2LeftColHead);

leftColBody.className += borderedElementStyle;
const listOfCategoriesParent = document.getElementById('left-list');


categories.forEach(item => {

    const categoryCell = document.createElement('li');
    categoryCell.className = 'cell';
    const category = document.createElement('span');

    createList(listOfCategoriesParent, "categories", "category", categoryCell, category, item);
})

listOfCategoriesParent.addEventListener("click", handlerNames, {once: true});


export {mainContainer, centerColHead, centerColBody, borderedElementStyle, rightColHead, rightColBody, formContainer, formBodyContainer};
