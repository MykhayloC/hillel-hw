'use strict';

import {
    mainContainer,
    centerColHead,
    centerColBody,
    rightColHead,
    rightColBody,
    borderedElementStyle,
    formContainer,
    formBodyContainer
} from "./script.js";
import {arrayOfGoods, citiesOfUkraine} from "./data.js";

function createList(ulItem, nameOfClass, spanClass, liItem, spanItem, item) {
    ulItem.className = nameOfClass;
    spanItem.className = spanClass;
    spanItem.innerHTML = item;
    ulItem.append(liItem);
    liItem.append(spanItem);
}

function handlerNames(e) {
    centerColHead.className += borderedElementStyle;
    const h2CenterColHead = document.createElement('h2');
    h2CenterColHead.className = 'catalog-header';
    h2CenterColHead.className += ' center-header'
    h2CenterColHead.innerHTML = "Names";
    centerColHead.append(h2CenterColHead);

    const categoryName = e.target.innerHTML;

    const goodsOfCategory = arrayOfGoods.reduce((acc, item) => {
        if (item.category === categoryName) {
            acc.push(item.name);
        }
        return acc;
    }, []);

    centerColBody.className += borderedElementStyle;
    const listOfNamesParent = document.getElementById('center-list');

    goodsOfCategory.forEach(item => {

        const nameCell = document.createElement('li');
        nameCell.className = 'cell';
        const name = document.createElement('span');

        createList(listOfNamesParent, "names", "name", nameCell, name, item);

    })

    listOfNamesParent.addEventListener("click", handlerGoods, {once: true});
}

function handlerGoods(e) {
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

    productInfo.forEach(item => {
        const property = document.createElement('p');
        property.innerHTML = item;
        property.className = 'property';
        productProperties.append(property);
    })

    const button = document.createElement('button');
    rightColBody.append(button);
    button.innerHTML = "To buy product!";
    button.className = 'buy-button';

    const productAmount = product.count;
    const nameOfProduct = product.name;

    button.addEventListener("click", createRegistrationForm);

    function createRegistrationForm() {
        mainContainer.querySelector('.cols-container').remove();
        const formBody = document.querySelector('.form-body');
        const registrationHeader = mainContainer.querySelector('h3');
        const registrationMessage = "Please fill the registration form below:";
        const zeroAmountMessage = "Sorry this product is unavailable now";
        const errorMessage = "Please input correct data";
        const errorClass = 'input-error';

        if (!productAmount) {
            registrationHeader.innerHTML = zeroAmountMessage;
            return
        }
        registrationHeader.innerHTML = registrationMessage;

        createInputElement('name', 'input-data', 'input', 'input-name', '', true, formBody, 'clear-name', 'clear-btn');
        const nameMessage = "Input your name and surname";
        createTitleOfElement('name-message', nameMessage, formBody);

        const inputNameElement = document.querySelector('#name');

        inputNameElement.addEventListener('change', checkNameData);

        function checkNameData() {
            const messageElement = document.querySelector('#name-message');
            const nameData = inputNameElement.value;
            const nameArray = nameData.split(' ');

            if (nameArray.length < 2) {
                messageElement.className = errorClass;
                messageElement.innerHTML = errorMessage;
            } else messageElement.innerHTML = '';
        }

        const selectCity = document.createElement('select');
        selectCity.required = true;
        selectCity.id = 'select';
        selectCity.name = 'cities';
        formBody.append(selectCity);
        for (let i = 0; i < citiesOfUkraine.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = citiesOfUkraine[i];
            option.value = citiesOfUkraine[i];
            selectCity.append(option);
        }
        const cityMessage = "Select your city";
        createTitleOfElement('city-message', cityMessage, formBody);

        selectCity.addEventListener('change', checkCity);

        function checkCity() {
            let selectedCity = false;
            for (let i = 0; i < citiesOfUkraine.length; i++) {
                if (select.options[i].selected === true) selectedCity = true;
            }
            if (selectedCity === true) {
                const selectStatus = document.getElementById('city-message');
                selectStatus.innerHTML = '';
            }
        }

        createInputElement('warehouse', 'clear-warehouse', 'text', 'warehouse', '', true, formBody);

        const warehouseMessage = "Input the number of NovaPoshta warehouse";
        createTitleOfElement('warehouse-message', warehouseMessage, formBody);

        const inputWarehouseNumber = document.querySelector('#warehouse');
        inputWarehouseNumber.addEventListener('change', checkWarehouseData);

        function checkWarehouseData() {
            const messageElement = document.getElementById('warehouse-message');
            const warehouseData = inputWarehouseNumber.value;

            if (isNaN(warehouseData) || +warehouseData === 0 || warehouseData === undefined) {
                messageElement.className = errorClass;
                messageElement.innerHTML = errorMessage;
            } else messageElement.innerHTML = '';
        }

        const paymentMessage = "Choose the type of payment:"
        createTitleOfElement('payment-message', paymentMessage, formBody);

        const chooseTypeOfPayment = document.createElement('div')
        chooseTypeOfPayment.className = 'radio-container';
        formBody.append(chooseTypeOfPayment);

        const advanceMessage = "Payment in advance";
        createRadioButton('advance', 'advance-payment', chooseTypeOfPayment, advanceMessage, false);

        const afterMessage = "After payment";
        createRadioButton('after', 'after-payment', chooseTypeOfPayment, afterMessage, false);

        const bankMessage = "Payment with bank card";
        createRadioButton('bank', 'bank-payment', chooseTypeOfPayment, bankMessage, false);

        const typeOfPaymentMessage = document.createElement('p');
        typeOfPaymentMessage.className = 'payment-message';
        formBody.append(typeOfPaymentMessage);

        document.querySelector('.radio-container').addEventListener('change', selectPayment);

        function selectPayment() {
            const paymentTitleElement = document.getElementById('payment-message');
            paymentTitleElement.innerHTML = '';

            typeOfPaymentMessage.textContent = ` Chosen type of payment is "${document.querySelector('input[name="payment"]:checked').textContent}"`;

            const elementToClear = document.querySelector('.radio-container');
            elementToClear.className = 'clear-radio';
        }

        createNumberElement('amount', 1, productAmount, 1, 'amount', formBody)

        const amountMessage = "Input amount of items for order";
        createTitleOfElement('amount-message', amountMessage, formBody);

        document.getElementById('amount').addEventListener("change", checkAmountData);

        function checkAmountData() {
            const checkData = document.getElementById('amount').value;
            const amountMessage = document.getElementById('amount-message');
            if (+checkData < 1 || +checkData > productAmount || isNaN(checkData)) {
                amountMessage.className = errorClass;
                amountMessage.innerHTML = errorMessage;
            } else amountMessage.innerHTML = '';
        }

        createTextAreaElement('comments', '', 'comments', 5, 30, formBody);

        const commentMessage = "Leave some comments for your order";
        createTitleOfElement('comment-message', commentMessage, formBody);

        const nextRow = document.createElement('br');
        formBody.append(nextRow);
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = "Confirm!";
        formBody.append(submitBtn);

        formBody.addEventListener('submit', submitForm);

        function submitForm(e) {
            e.preventDefault();
            const params = {
                username: formBody.input-name.value,
                city: formBody.cities.value,
                warehouse: formBody.warehouse.value,
                payment: formBody.payment.value,
                amount: formBody.amount.value,
                comments: formBody.comments.value,
            }

            mainContainer.querySelector('.form-container')?.remove();
            const h3 = document.createElement('h3')
            h3.className = 'final-info-head';
            h3.innerHTML = "Information";
            mainContainer.append(h3);
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            const productInfoMessage = `You ordered ${params.amount} pieces of product "${nameOfProduct}"`;
            const productDeliveryMessage = `The order will be delivered to ${params.city} on the warehouse of Nova Poshta № ${params.warehouse}`;
            p1.className = 'final-info-body';
            p1.innerHTML = productInfoMessage;
            mainContainer.append(p1);
            p2.className = 'final-info-body';
            p2.innerHTML = productDeliveryMessage;
            mainContainer.append(p2);
        }
    }
}

function createInputElement(id, elementClass, elementType, elementName, elementValue, requiredValue, parentElement) {
    const element = document.createElement('input');
    element.id = id;
    element.className = elementClass;
    element.type = elementType;
    element.name = elementName;
    element.required = requiredValue;
    element.value = elementValue;
    parentElement.append(element);
}

function createTitleOfElement(id, elementText, parentElement) {
    const element = document.createElement('p');
    element.id = id;
    element.innerHTML = elementText;
    element.className = 'input-title';
    parentElement.append(element);
}

function createRadioButton(id, buttonValue, parentElement, textValue, checkedValue) {
    const buttonName = document.createElement('input');
    buttonName.id = id;
    buttonName.type = 'radio';
    buttonName.name = 'payment';
    buttonName.textContent = textValue;
    buttonName.value = buttonValue;
    buttonName.checked = checkedValue;
    parentElement.append(buttonName);
    let label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = textValue;
    parentElement.append(label);
}

function createNumberElement(elementName, min, max, step, id, parentElement) {
    const element = document.createElement('input');
    element.type = 'number';
    element.required = true;
    element.name = elementName;
    element.value = min;
    element.min = min;
    element.max = max;
    element.step = step;
    element.id = id;
    parentElement.append(element);
}

function createTextAreaElement(elementName, elementValue, id, rows, cols, parentElement) {
    const element = document.createElement('textarea');
    element.name = elementName;
    element.value = elementValue;
    element.id = id;
    element.rows = rows;
    element.cols = cols;
    parentElement.append(element);
}

export {createList, handlerNames};
