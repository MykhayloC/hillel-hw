'use strict';

const shoppingCart = {
    items: [
        {
            name: 'Headphone',
            count: 1,
            price: 100,
        }
    ],
    addItem(newItem) {
        const itemCheck = this.items.find(item => item.name.toLowerCase() === newItem.name.toLowerCase());
        itemCheck === undefined ? this.items.push(newItem) : itemCheck.count += newItem.count;
    },
    deleteItem(itemName) {
        const indexToDelete = this.items.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
        indexToDelete !== (-1) ? this.items.splice(indexToDelete, 1) : console.log(`Товар ${itemName} відсутній в корзині`);
    },
    getTotalSum(){
        return this.items.map(item => item.count * item.price).reduce((accum, currentValue) => accum + currentValue);
    },
    getAllItems(){
        console.log(this.items)
    },
};

// Перевірка працездатності скрипта:

const newItem1 = {
    name: 'Phone',
    count: 2,
    price: 500,
}
const newItem2 = {
    name: 'headPhone',
    count: 3,
    price: 100,
}
const newItem3 = {
    name: 'Tablet',
    count: 10,
    price: 1200,
}

shoppingCart.getAllItems();
shoppingCart.addItem(newItem1);
shoppingCart.getAllItems();
shoppingCart.addItem(newItem2);
shoppingCart.getAllItems();
shoppingCart.addItem(newItem3);
shoppingCart.getAllItems();
console.log(`Загальна вартість товарів в корзині складає ` + shoppingCart.getTotalSum() + ` умовних одиниць`);
shoppingCart.deleteItem("phone");
shoppingCart.getAllItems();
console.log(`Загальна вартість товарів в корзині складає ` + shoppingCart.getTotalSum() + ` умовних одиниць`);
