'use strict';

let arrayOfGoods = [];

function createItem(name, category, count, price) {
    arrayOfGoods.push({name, category, count, price});
}

// Створення масиву товарів

createItem('Mercedes', 'Cars', 2, 100000);
createItem('Toyota', 'Cars', 3, 50000);
createItem('Potato', 'Vegetables', 1000, 30);
createItem('Tomato', 'Vegetables', 0, 100);
createItem('Cucumber', 'Vegetables', 321, 60);
createItem('Galaxy', 'Phones', 10, 10000);
createItem('IPhone', 'Phones', 5, 20000);
createItem('Shirt', 'Closes', 15, 200);
createItem('HP', 'Laptops', 5, 500);
createItem('Asus', 'Laptops', 1, 400);
createItem('Comanche', 'Bicycles', 10, 1000);

const categories = arrayOfGoods.reduce((acc,item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category)
    }
        return acc;
}, []);

const leftCol = document.querySelector('.left-col');
const centerCol = document.querySelector('.center-col');
const rightCol = document.querySelector('.right-col');
const mainDiv = document.querySelector('.main-div');
const regForm = document.querySelector('.reg-form')
const citiesOfUkraine = [ 'Kyiv',
    'Kharkiv',
    'Lviv',
    'Sumy',
    'Dnipro',
    'Kherson',
    'Odesa',
    'Donetsk',
    'Luhansk',
];

// Створення стилів
const cellStyle = `
       height: 35px;
       padding: 5px;
       margin: 5px;
       font-weight: 600;
       font-size: 20px;
       text-align: center;
       color: red;
       list-style-type: none;
`;
const hoverStyle = `
       color: green;
       font-weight: 700;
       font-size: 25px;
`;

function hover() {
    this.style.cssText = hoverStyle;
}

function hoverOff() {
    this.style.cssText = cellStyle;
}

function createList(ulItem, nameOfClass, spanClass, liItem, spanItem, cellStyle, item, hoverStyle, hoverOffStyle) {
    ulItem.className = nameOfClass;
    spanItem.className = spanClass;
    spanItem.innerHTML = item;
    liItem.style.cssText = cellStyle;
    spanItem.onmouseover = hoverStyle;
    spanItem.onmouseout = hoverOffStyle;
    ulItem.append(liItem);
    liItem.append(spanItem);
}

const categoryList = document.createElement('ul');
leftCol.append(categoryList);

categories.forEach(item => {

    const categoryCell = document.createElement('li');
    categoryCell.className = 'cell';
    const category = document.createElement('span');

    createList(categoryList, "categories", "category", categoryCell, category, cellStyle, item, hover, hoverOff);

    category.addEventListener("click", handlerNames);
})

function handlerNames() {
    centerCol.querySelector('ul')?.remove();
    const nameList = document.createElement('ul');
    centerCol.append(nameList);
    const categoryName = this.innerHTML;

    const goodsOfCategory = arrayOfGoods.reduce((acc, item) => {
        if (item.category === categoryName) {
            acc.push(item.name);
        }
        return acc;
    }, []);

    goodsOfCategory.forEach(item => {

        const nameCell = document.createElement('li');
        nameCell.className = 'cell';
        const name = document.createElement('span');

        createList(nameList, "names", "name", nameCell, name, cellStyle, item, hover, hoverOff);

        name.addEventListener("click", handlerGoods);
    })
}

function handlerGoods() {
    rightCol.querySelector('ul')?.remove();
    rightCol.querySelector('button')?.remove();
    const productList = document.createElement('ul');
    rightCol.append(productList);

    let productInfo = [];

    const productName = this.innerHTML;
    const product = arrayOfGoods.filter(item => item.name === productName)[0];

    for (let key in product) {
        let goodsProperty = key;
        goodsProperty = goodsProperty[0]?.toUpperCase() + goodsProperty.slice(1);
        let goodsResult = goodsProperty + ' of product: ' + product[key];
        productInfo.push(goodsResult);
    }

    productInfo.forEach(item => {

        const productCell = document.createElement('li');
        productCell.className = 'cell';
        const productItem = document.createElement('span');

        createList(productList, "products", "product", productCell, productItem, cellStyle, item);

    })
    const button = document.createElement('button');
    rightCol.append(button);
    button.innerHTML = "To buy product!";
    button.className = 'button';

    const productAmount = product.count;
    const nameOfProduct = product.name;

    button.onclick = function () {
        mainDiv.querySelector('.row')?.remove();
        const formBody = document.createElement('form');
        formBody.className = 'form-container';
        mainDiv.className = 'reg-form';
        mainDiv.append(formBody);
        const formTitle = document.createElement('h3');

        if (!productAmount) {
            formTitle.innerHTML = "Sorry this product is unavailable.";
            formBody.prepend(formTitle);
            return
        }
        formTitle.innerHTML = "Please fill the registration form below:";

        formBody.prepend(formTitle);

        let nameSurname;
        const nameMessage = "Input your name and surname:";
        createTitleOfElement(nameSurname, nameMessage, formBody);

        let inputName;
        createInputElement(inputName, 'name', 'clear-name', 'text', 'name', '', true, formBody);

        const inputNameElement = document.querySelector('#name');
        inputNameElement.addEventListener('change', checkNameData);

        function checkNameData () {
            const nameData = inputNameElement.value;

            const nameArray = nameData.split(' ');
            if (nameArray.length < 2) {
                alert(`Please input your name and surname!`);
                inputNameElement.value = '';
            }
        }

        const clearNameButton = document.querySelector('#clear-name');
        clearNameButton.addEventListener('click', clearName)

        function clearName(e) {
            e.preventDefault();
            inputNameElement.value = '';
        }

        let cities;
        const cityMessage = "Input your city:"
        createTitleOfElement(cities, cityMessage, formBody);

        const selectCity = document.createElement('select');
        selectCity.name = 'cities';
        formBody.append(selectCity);
        for (let i = 0; i < citiesOfUkraine.length; i++) {
            const option = document.createElement('option');
            option.innerHTML = citiesOfUkraine[i];
            option.value = citiesOfUkraine[i];
            selectCity.append(option);
        }

        let warehouseOfCourier;
        const warehouseMessage = "Input the number of NovaPoshta warehouse:";
        createTitleOfElement(warehouseOfCourier, warehouseMessage, formBody);

        let warehouseNumber;
        createInputElement(warehouseNumber, 'warehouse', 'clear-warehouse', 'text', 'warehouse', '', true, formBody);

        const inputWarehouseNumber = document.querySelector('#warehouse');
        inputWarehouseNumber.addEventListener('change', checkWarehouseData);
        function checkWarehouseData() {
            const warehouseData = inputWarehouseNumber.value;
            if (isNaN(warehouseData) || +warehouseData === 0) {
                alert(`Please input correct number of warehouse!`);
                inputWarehouseNumber.value = '';
            }
        }

        const clearWarehouseButton = document.querySelector('#clear-warehouse');
        clearWarehouseButton.addEventListener('click', clearWarehouse)

        function clearWarehouse(e) {
            e.preventDefault();
            inputWarehouseNumber.value = '';
        }

        let typeOfPayment;
        const paymentMessage = "Choose the type of payment:"
        createTitleOfElement(typeOfPayment, paymentMessage, formBody);

        const chooseTypeOfPayment = document.createElement('div')
        chooseTypeOfPayment.className = 'radio-container';
        formBody.append(chooseTypeOfPayment);

        let advancePayment;
        const advanceMessage = "Payment in advance";
        createRadioButton(advancePayment, 'advance', 'advance-payment', chooseTypeOfPayment, advanceMessage, false);

        let afterPayment;
        const afterMessage = "After payment";
        createRadioButton(afterPayment, 'after', 'after-payment', chooseTypeOfPayment, afterMessage, false);

        let bankCard;
        const bankMessage = "Payment with bank card";
        createRadioButton(bankCard, 'bank', 'bank-payment', chooseTypeOfPayment, bankMessage, false);

        const typeOfPaymentMessage = document.createElement('p');
        typeOfPaymentMessage.className = 'payment-message';
        formBody.append(typeOfPaymentMessage);

        document.querySelector('.radio-container').addEventListener('change', selectPayment);

        function selectPayment() {
            typeOfPaymentMessage.textContent = ` Chosen type of payment is ${document.querySelector('input[name="payment"]:checked').textContent}`;
        }

        let amountOfItems;
        const amountMessage = "Input amount of items for order:";
        createTitleOfElement(amountOfItems, amountMessage, formBody);

        const rangeContainer = document.createElement('p');
        formBody.append(rangeContainer);
        let inputAmount;
        createRangeElement(inputAmount, 'range', 'amount', 1, 1, productAmount, 1, 'input-range',  rangeContainer);
        const rangeDataOutput = document.createElement('p');
        const rangeData = document.querySelector('#input-range');
        rangeData.oninput = function () {
            rangeDataOutput.textContent = rangeData.value;
        };
        formBody.append(rangeDataOutput);

        let comment;
        const commentMessage = "Leave some comments for your order:";
        createTitleOfElement(comment, commentMessage, formBody);

        let commentArea;
        createTextAreaElement(commentArea, 'comments', '', 'comments', 5, 30, formBody);

        const nextRow = document.createElement('br');
        formBody.append(nextRow);
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = "Confirm!";
        formBody.append(submitBtn);

        formBody.addEventListener('submit', submitForm);
        function submitForm (e) {
            e.preventDefault();
            const params = {
                username: formBody.name.value,
                city: formBody.cities.value,
                warehouse: formBody.warehouse.value,
                payment: formBody.payment.value,
                amount: formBody.amount.value,
                comments: formBody.comments.value,
            }
            console.log(params);

            mainDiv.querySelector('.form-container')?.remove();
            const h3 = document.createElement('h3')
            h3.className = 'col-name';
            h3.innerHTML = "Information";
            mainDiv.append(h3);
            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            const productInfoMessage = `You ordered ${params.amount} pieces of product ${nameOfProduct}`;
            const productDeliveryMessage = `The order will be delivered to ${params.city} on the warehouse of Nova Poshta № ${params.warehouse}`;
            p1.innerHTML = productInfoMessage;
            mainDiv.append(p1);
            p2.innerHTML = productDeliveryMessage;
            mainDiv.append(p2);

        }
    }
}

function createTitleOfElement(element, elementText, parentElement) {
    element = document.createElement('p');
    element.innerHTML = elementText;
    element.className = 'input-title';
    parentElement.append(element);
}

function createInputElement(element, id, buttonId, elementType, elementName, elementValue, requiredValue, parentElement) {
    element = document.createElement('input');
    element.id = id;
    element.type = elementType;
    element.name = elementName;
    element.required = requiredValue;
    element.value = elementValue;
    parentElement.append(element);
    let resetBtn = document.createElement('input');
    resetBtn.id = buttonId;
    resetBtn.type = 'reset';
    resetBtn.name = 'clear-button';
    resetBtn.value = 'Clear';
    parentElement.append(resetBtn);
}

function createRadioButton(buttonName, id, buttonValue, parentElement, textValue, checkedValue) {
    buttonName = document.createElement('input');
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

function createRangeElement(element, elementType, elementName, elementValue, min, max, step, id, parentElement) {
    element = document.createElement('input');
    element.type = elementType;
    element.name = elementName;
    element.value = elementValue;
    element.min = min;
    element.max = max;
    element.step = step;
    element.id = id;
    parentElement.append(element);
}

function createTextAreaElement(element, elementName, elementValue, id, rows, cols, parentElement) {
    element = document.createElement('textarea');
    element.name = elementName;
    element.value = elementValue;
    element.id = id;
    element.rows = rows;
    element.cols = cols;
    parentElement.append(element);
}