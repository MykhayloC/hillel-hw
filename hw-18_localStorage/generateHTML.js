'use strict';

import {
    mainContainer,
    centerColHead,
    centerColBody,
    rightColHead,
    rightColBody,
    borderedElementStyle,
    leftColHead,
    leftColBody,
} from "./script.js";
import {arrayOfGoods, categories, citiesOfUkraine} from "./data.js";

const buyButtonText = "To buy product!";
const deleteButtonText = "Delete order";
const zeroAmountMessage = "Sorry this product is unavailable now";
const errorMessage = "Please input correct data";
const errorClass = 'input-error';
const namePattern = /^[A-ZA-ЯЁЄЇҐ][a-zа-яёєїґ]+\s[A-ZA-ЯЁЄЇҐ][a-zа-яёєїґ]+$/i;
const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/gm;
const phonePattern = /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;
const storageKey = 'orders';
const listOfNamesParent = document.getElementById('center-list');
const formBody = document.querySelector('.form-body');
let orders = getDataFromAPI();

function handlerNames(e) {
    refreshCenterHead("Names");
    clearElements(centerColBody, 'p');
    const categoryName = e.target.innerHTML;

    const goodsOfCategory = arrayOfGoods.reduce((acc, item) => {
        if (item.category === categoryName) {
            acc.push(item.name);
        }
        return acc;
    }, []);

    centerColBody.className += borderedElementStyle;
    clearElements(listOfNamesParent, 'li');

    goodsOfCategory.forEach(item => {
        createPList('p', item, 'list-element', listOfNamesParent);
    })
    listOfNamesParent.addEventListener("click", handlerGoods);
}

function handlerGoods(e) {
    clearElement(rightColHead, 'h2');
    rightColHead.className += borderedElementStyle;
    const h2RightColHead = document.createElement('h2');
    h2RightColHead.className = 'catalog-header';
    h2RightColHead.className += ' center-header'
    h2RightColHead.innerHTML = "Product info";
    rightColHead.append(h2RightColHead);
    let productInfo = [];
    const productName = e.target.innerHTML;
    const product = arrayOfGoods.filter(item => item.name === productName)[0];

    for (let key in product) {
        let goodsProperty = key;
        goodsProperty = goodsProperty[0]?.toUpperCase() + goodsProperty.slice(1);
        let goodsResult = goodsProperty + ' of product: ' + product[key];
        productInfo.push(goodsResult);
    }

    rightColBody.className += borderedElementStyle;
    const productProperties = document.getElementById("right-list");
    clearElements(productProperties, 'p');
    clearElement(rightColBody, 'button');

    productInfo.forEach(item => {
        createPList('p', item, 'property', productProperties);
    })

    const buyButton = createButton('button', rightColBody, buyButtonText, 'buy-button', 'button');
    buyButton.addEventListener("click", createRegistrationForm);

    const productAmount = product.count;
    const nameOfProduct = product.name;
    const productPrice = product.price;

    function createRegistrationForm() {
        visibilityOfElement(document, '.buttons-container', 'hidden');
        displayOfElement(mainContainer, '.cols-container', 'none');
        displayOfElement(document, '.form-container', 'block');


        const registrationHeader = mainContainer.querySelector('h3');

        if (!productAmount) {
            registrationHeader.innerHTML = zeroAmountMessage;
            displayOfElement(document, '.form-body-container', 'none');
            return
        }

        const inputNameElement = document.querySelector('#name');
        inputNameElement.addEventListener('change', checkName);

        function checkName() {
            const messageElement = document.querySelector('#name-message');
            const checkText = inputNameElement.value;
            checkExpression(messageElement, namePattern, checkText);
        }

        const inputEmailElement = document.querySelector('#email');
        inputEmailElement.addEventListener('change', checkEmail);

        function checkEmail() {
            const messageElement = document.querySelector('#email-message');
            const checkText = inputEmailElement.value;
            checkExpression(messageElement,emailPattern, checkText)
        }

        const inputPhoneElement = document.querySelector('#phone');
        inputPhoneElement.addEventListener('change', checkPhone);

        function checkPhone() {
            const messageElement = document.querySelector('#phone-message');
            const checkText = inputPhoneElement.value;
            checkExpression(messageElement,phonePattern, checkText)
        }

        const selectCity = document.querySelector('select');

        for (let i = 0; i < citiesOfUkraine.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = citiesOfUkraine[i];
            option.value = citiesOfUkraine[i];
            selectCity.append(option);
        }

        selectCity.addEventListener('change', checkCity);

        function checkCity() {
            let selectedCity = false;
            for (let i = 0; i < citiesOfUkraine.length; i++) {
                if (select.options[i].selected === true) selectedCity = true;
            }
            if (selectedCity === true) {
                const selectStatus = document.getElementById('city-message');
                selectStatus.style.visibility = 'hidden';
            }
        }

        const inputWarehouseNumber = document.querySelector('#warehouse');
        inputWarehouseNumber.addEventListener('change', checkWarehouseData);

        function checkWarehouseData() {
            const messageElement = document.getElementById('warehouse-message');
            const warehouseData = inputWarehouseNumber.value;

            if (isNaN(warehouseData) || +warehouseData === 0 || warehouseData === undefined) {
                messageElement.className = errorClass;
                messageElement.innerHTML = errorMessage;
            } else messageElement.style.visibility = 'hidden';
        }

        document.querySelector('.radio-container').addEventListener('click', () => {
            document.getElementById('payment-message').style.visibility = 'hidden';
        });

        const amountField = document.getElementById('amount');
        amountField.setAttribute('max', `${productAmount}`);
        amountField.addEventListener("change", checkAmountData);

        function checkAmountData() {
            const checkData = document.getElementById('amount').value;
            const amountMessage = document.getElementById('amount-message');
            if (+checkData < 1 || +checkData > productAmount || isNaN(checkData)) {
                amountMessage.className = errorClass;
                amountMessage.innerHTML = errorMessage;
            } else amountMessage.style.visibility = 'hidden';
        }

        const nextRow = document.createElement('br');
        formBody.append(nextRow);
        const submitButtonText = "Confirm";
        createButton('button', formBody, submitButtonText, 'submit-btn', 'submit')
        formBody.addEventListener('submit', submitForm);

        function submitForm(e) {
            e.preventDefault();
            const orderCost = productPrice * formBody.amount.value;
            const currentDate = new Date();
            const day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            if (month < 10) month = '0' + month;
            const year = currentDate.getFullYear();

            const orderDetails = {
                username: formBody.querySelector('#name').value,
                product: nameOfProduct,
                price: productPrice,
                amount: formBody.amount.value,
                cost: orderCost,
                city: formBody.cities.value,
                warehouse: formBody.warehouse.value,
                payment: formBody.querySelector('input[name="payment"]:checked').value,
                date: `${day}.${month}.${year}`,
                comments: formBody.comments.value,
            }

            orders.push(orderDetails);

            sendDataToAPI(orders);

            mainContainer.querySelector('.form-container').style.display = 'none';

            location.reload();
        }
    }
}

function showOrders() {
    refreshLeftCol("Your orders");
    displayOfElement(mainContainer, '#right-head', 'none');
    displayOfElement(mainContainer, '#right-body', 'none');
    setStyleOfElement(mainContainer, '.col-left', 'width: 40%');
    setStyleOfElement(mainContainer, '.col-center', 'width: 60%');

    const listParent = document.getElementById('left-list');

    const ordersList = getDataFromAPI();

    if (!ordersList.length) {
        createPList('p', "You don't have any orders for this moment", errorClass, leftColBody);
    }

    for (let i = 0; i < ordersList.length; i++) {
        ordersList[i].id = i + 1;
    }

    for (let i = 0; i < ordersList.length; i++) {
        const shortInfo = `Date: ${ordersList[i].date}, cost: ${ordersList[i].cost}.`;
        const categoryCell = document.createElement('li');
        categoryCell.className = 'cell';
        categoryCell.style.border = '1px solid grey';
        categoryCell.style.borderRadius = '5px';
        const orderData = document.createElement('span');
        orderData.id = ordersList[i].id;
        createList(listParent, 'categories', 'category', categoryCell, orderData, shortInfo);
    }

    document.getElementById('left-list').querySelectorAll('span').forEach(item => item.addEventListener("click", orderDetails));

    function orderDetails(e) {
        refreshCenterHead("Order details:")
        clearElements(centerColBody, 'p');
        clearElements(centerColBody, 'button');
        modifyClassName(centerColBody, borderedElementStyle);
        centerColBody.className += borderedElementStyle;

        const orderToShow = e.target;
        const order = ordersList.filter(item => item.id === +orderToShow.id)[0];

        showOrderDetail(`Your name is ${order.username}`);
        showOrderDetail(`You ordered ${order.amount} piece(s) of ${order.product}`);
        showOrderDetail(`The price of ${order.product} is ${order.price}`);
        showOrderDetail(`The total cost of order is ${order.cost}`);
        showOrderDetail(`The chosen type of payment is ${order.payment}`);
        showOrderDetail(`The date of order is ${order.date}`);
        showOrderDetail(`The order will be delivered to ${order.city} to the warehouse №${order.warehouse}`);
        showOrderDetail(`Your comments to the order: ${order.comments}`);

        const deleteButton = createButton('button', centerColBody, deleteButtonText, 'buy-button', 'button');
        deleteButton.addEventListener('click', removeOrderFromBase);

        function removeOrderFromBase() {
            ordersList.splice(ordersList.indexOf(order), 1);
            sendDataToAPI(ordersList);
            showOrders();
        }
    }
}

function refreshLeftCol(newHeadTitle) {
    displayOfElement(mainContainer, '.cols-container', 'block');
    visibilityOfElement(document, '.buttons-container', 'visible');
    clearElement(leftColHead, 'h2');
    clearElement(centerColHead, 'h2');
    clearElement(rightColHead, 'h2');
    modifyClassName(leftColHead, borderedElementStyle);
    modifyClassName(centerColHead, borderedElementStyle);
    modifyClassName(rightColHead, borderedElementStyle);

    leftColHead.className += borderedElementStyle;
    const h2LeftColHead = document.createElement('h2');
    h2LeftColHead.className = 'catalog-header';
    h2LeftColHead.innerHTML = newHeadTitle;
    leftColHead.append(h2LeftColHead);

    clearElements(leftColBody, 'p');
    clearElements(leftColBody, 'li');
    clearElements(centerColBody, 'p');
    clearElements(centerColBody, 'button');
    clearElements(rightColBody, 'p');
    clearElements(rightColBody, 'button');
    modifyClassName(leftColBody, borderedElementStyle);
    modifyClassName(centerColBody, borderedElementStyle);
    modifyClassName(rightColBody, borderedElementStyle);
    leftColBody.className += borderedElementStyle;
    const listOfCategoriesParent = document.getElementById('left-list');
    clearElements(listOfCategoriesParent, 'p');
}

function refreshCenterHead(newHeadTitle) {
    clearElement(centerColHead, 'h2');
    centerColHead.className += borderedElementStyle;
    const h2CenterColHead = document.createElement('h2');
    h2CenterColHead.className = 'catalog-header';
    h2CenterColHead.className += ' center-header'
    h2CenterColHead.innerHTML = newHeadTitle;
    centerColHead.append(h2CenterColHead);
}

function clearElement(element, selector) {
    element.querySelector(selector)?.remove();
}

function clearElements(element, selector) {
    element.querySelectorAll(selector)?.forEach(item => item.remove());
}

function visibilityOfElement(parentElement, selector, value) {
        parentElement.querySelector(selector).style.visibility = value;
}

function visibilityOfElements(parentElement, selector, value) {
        parentElement.querySelectorAll(selector).forEach(item => item.style.visibility = value);
}

function setStyleOfElement(parentElement, selector, settingAttributeValue) {
        parentElement.querySelectorAll(selector).forEach(item => item.setAttribute('style', settingAttributeValue));
}

function displayOfElement(parentElement, selector, value) {
        parentElement.querySelector(selector).style.display = value;
}

function modifyClassName(element, classToCut) {
    if (element.className.includes(classToCut)) {
        const indexOfStart = element.className.indexOf(classToCut);
        element.className = element.className.slice(0, indexOfStart+1);
    }
}

function generateCategories() {
    refreshLeftCol("Categories");

    const listOfCategories = document.getElementById('left-list');
    categories.forEach(item => {
        createPList('p', item, 'list-element', listOfCategories);
    })
}

function createList(ulItem, nameOfClass, spanClass, liItem, spanItem, item) {
    ulItem.className = nameOfClass;
    spanItem.className = spanClass;
    spanItem.innerHTML = item;
    ulItem.append(liItem);
    liItem.append(spanItem);
}

function createPList(tagName, text, className, parentElement) {
    const property = document.createElement(tagName);
    property.innerHTML = text;
    property.className = className;
    parentElement.append(property);
}

function createButton(tagName, parentElement, textOfElement, classOfElement, typeOfButton) {
    const button = document.createElement(tagName);
    parentElement.append(button);
    button.textContent = textOfElement;
    button.className = classOfElement;
    button.type = typeOfButton;
    return button;
}

function checkExpression(element, regularExpression, valueToCheck) {
    if (regularExpression.test(valueToCheck)) {
        element.style.visibility = 'hidden';
    } else {
        element.className = errorClass;
        element.innerHTML = errorMessage;
    }
}

function sendDataToAPI(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
}

function getDataFromAPI() {
    const storageData = JSON.parse(localStorage.getItem(storageKey));
    return storageData ?? [];
}
function showOrderDetail(message) {
    const orderProperty = document.createElement('p');
    orderProperty.innerHTML = message;
    orderProperty.className = 'property';
    centerColBody.append(orderProperty);
}

export {createList, handlerNames, createButton, getDataFromAPI, sendDataToAPI, generateCategories, showOrders};
