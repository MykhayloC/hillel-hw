'use strict';

function* Foo() {
    console.log('start')
    yield 1
    yield 2
    yield 3
    console.log('finish')
}

console.log(`\nGenerator:`);

const iteratorGen = Foo();

console.log(iteratorGen.next());
console.log(iteratorGen.next());
console.log(iteratorGen.next());
console.log(iteratorGen.next());

let iteribleObj = {
    start: 1,
    finish: 3,

    [Symbol.iterator]() {
        return this;
    },

    next() {
        if (!this.current) this.current = this.start;
        if (this.current <= this.finish) {
            return {
                value: this.current++,
                done: false,
            }
        } else {
            console.log('finish');
            return {
                value: undefined,
                done: true,
            }
        }
    }
}

function Boo() {
    console.log('start');
    return iteribleObj;
}

console.log(`\nWithout Generator:`);

const iteratorNonGen = Boo();

console.log(iteratorNonGen.next());
console.log(iteratorNonGen.next());
console.log(iteratorNonGen.next());
console.log(iteratorNonGen.next());
