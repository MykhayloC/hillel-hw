'use strict';

const h2 = document.createElement('h2');
const div = document.createElement('div');
const table = document.createElement('table');
const data = [...Array(100).keys()].map(i => ++i);

h2.setAttribute('style', 'text-align: center')
h2.innerHTML = 'Домашнє завдання 15';
document.body.prepend(div);
div.appendChild(h2);
div.append(table);

table.style.cssText = `
    border: 1px solid #ccc;
    border-spacing: 3px;
    table-layout: fixed;
    width: 500px;
    margin: auto;
`;
// table.setAttribute('style', 'border: 1px solid #ccc');

for (let i = 0; i < 10; i++) {
    let tableRow = document.createElement('tr');
    let n = 0;
    for (let j = 1; j <= 10; j++) {
        let tableCell = document.createElement('td');
        tableCell.style.cssText = `
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
        `;
        tableRow.append(tableCell);
    }
    n += 10;
    table.append(tableRow);
}

let cells = document.getElementsByTagName('td');
for (let i = 0; i < 100; i++) {
    cells[i].innerHTML = data[i];
}
