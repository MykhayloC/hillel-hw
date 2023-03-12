'use strict';

let arrayOfGoods = [];

function createItem(name, category, count, price) {
    let item = {};
    item.name = name;
    item.category = category;
    item.count = count;
    item.price = price;
    arrayOfGoods.push(item);
}

// Створення масиву товарів

createItem('Mercedes', 'Cars', 2, 100000);
createItem('Toyota', 'Cars', 3, 50000);
createItem('Potato', 'Vegetables', 1000, 30);
createItem('Tomato', 'Vegetables', 200, 100);
createItem('Cucumber', 'Vegetables', 321, 60);
createItem('Galaxy', 'Phones', 10, 10000);
createItem('IPhone', 'Phones', 5, 20000);
createItem('Shirt', 'Closes', 15, 200);

let categories = [];
for (let i = 0; i < arrayOfGoods.length; i++) {
    if (!categories.includes(arrayOfGoods[i].category)) {
        categories.push(arrayOfGoods[i].category)
    } else continue;
}

const leftCol = document.querySelector('.left-col');
const centerCol = document.querySelector('.center-col');
const rightCol = document.querySelector('.right-col');

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
const buttonStyle = `
       margin: 0 auto;
       display: block; 
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

    let goodsOfCategory = [];

    const categoryName = this.innerHTML;
    for (let i = 0; i < arrayOfGoods.length; i++) {
        if (arrayOfGoods[i].category === categoryName) {
            goodsOfCategory.push(arrayOfGoods[i].name);
        } else continue;
    }

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

    for (let i = 0; i < arrayOfGoods.length; i++) {
        if (arrayOfGoods[i].name === productName) {
            for (let key in arrayOfGoods[i]) {
                let goodsProperty = key;
                goodsProperty = goodsProperty[0]?.toUpperCase() + goodsProperty.slice(1);
                let goodsResult = goodsProperty + ' of product: ' + arrayOfGoods[i][key];
                productInfo.push(goodsResult);
            }
        } else continue;
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
    button.style.cssText = buttonStyle;
    button.onclick = function () {
        alert(`Chosen product "${productName}" was added to your cart`);
        centerCol.querySelector('ul')?.remove();
        rightCol.querySelector('ul')?.remove();
        rightCol.querySelector('button')?.remove();
    };
}
