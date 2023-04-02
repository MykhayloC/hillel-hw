'use strict';

class Hamburger {
    constructor(size, addition) {
    this.price = size.price + addition.price;
    this.calories = size.calories + addition.calories;
}

    static SMALL_SIZE = {
        price: 50,
        calories: 20,
    }

    static BIG_SIZE = {
        price: 100,
        calories: 40,
    }

    static STUFFING_CHESE = {
        price: 10,
        calories: 20,
    }

    static STUFFING_SALAD = {
        price: 20,
        calories: 5,
    }

    static STUFFING_POTATO = {
        price: 15,
        calories: 10,
    }

    static TOPPING_MAYO = {
        price: 20,
        calories: 5,
    }

    static TOPPING_SAUCE = {
        price: 15,
        calories: 0,
    }

    addTopping (topping) {
        this.price += topping.price;
        this.calories += topping.calories;
    }

    get calculate () {
        return this.calories;
    }

    get calculatePrice () {
        return this.price;
    }
}

// великий гамбургер з начинкою з картоплі
let hamburger = new Hamburger(Hamburger.BIG_SIZE, Hamburger.STUFFING_POTATO);

// добавка з майонезу
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// запитаємо скільки там калорій
console.log("Calories: " + hamburger.calculate);

// скільки коштує
console.log("Price: " + hamburger.calculatePrice);

// я тут передумав і вирішив додати ще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А скільки тепер коштує?
console.log("Price with sauce: " + hamburger.calculatePrice);
