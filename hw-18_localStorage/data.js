'use strict';

const catalog = {
    goods: [],
    addItem: function createItem(name, category, count, price) {
        this.goods.push({name, category, count, price});
    },
};

catalog.addItem('Mercedes', 'Cars', 2, 100000);
catalog.addItem('Toyota', 'Cars', 3, 50000);
catalog.addItem('Potato', 'Vegetables', 1000, 30);
catalog.addItem('Tomato', 'Vegetables', 0, 100);
catalog.addItem('Cucumber', 'Vegetables', 321, 60);
catalog.addItem('Galaxy', 'Phones', 10, 10000);
catalog.addItem('IPhone', 'Phones', 5, 20000);
catalog.addItem('Shirt', 'Closes', 15, 200);
catalog.addItem('HP', 'Laptops', 5, 500);
catalog.addItem('Asus', 'Laptops', 1, 400);
catalog.addItem('Comanche', 'Bicycles', 10, 1000);

const arrayOfGoods = catalog.goods.slice(0);

const categories = arrayOfGoods.reduce((acc,item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category)
    }
    return acc;
}, []);


const citiesOfUkraine = [
    '------',
    'Kyiv',
    'Kharkiv',
    'Lviv',
    'Sumy',
    'Dnipro',
    'Kherson',
    'Odesa',
    'Donetsk',
    'Luhansk',
];


export {arrayOfGoods, categories, citiesOfUkraine}
