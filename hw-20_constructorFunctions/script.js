'use strict';

function Human(name, gender) {
    this.name = name;
    this.gender = gender;
}

function Apartment() {
    this.citizens = [];
    this.addCitizen = function (citizen) {
        this.citizens.push(citizen);
        return this.citizens;
    }
}

function Building(maxAmount) {
    this.apartments = [];
    this.maxAmount = maxAmount;
    this.addApartment = function (appartment) {
        this.apartments.length < this.maxAmount ? this.apartments.push(appartment) : console.log(`\nThe house is full! You can't add new apartment to this house.`);
    }
}

const firstCitizen = new Human('John', 'man');
const secondCitizen = new Human('Mary', 'women');
const thirdCitizen = new Human('Mark', 'man');
const firstApartment = new Apartment;
const secondApartment = new Apartment;
const thirdApartment = new Apartment;
const house = new Building(2);

firstApartment.addCitizen(firstCitizen);
firstApartment.addCitizen(secondCitizen);
secondApartment.addCitizen(firstCitizen);
thirdApartment.addCitizen(thirdCitizen);

house.addApartment(firstApartment);
house.addApartment(secondApartment);
house.addApartment(thirdApartment);

console.log(house);
