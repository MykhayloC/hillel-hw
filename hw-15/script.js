'use strict';

const h2 = document.createElement('h2');
const div = document.createElement('div');
const table = document.createElement('table');

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

const cellStyle = `
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
        `;

for (let i = 0; i < 10; i++) {
    let tableRow = document.createElement('tr');

    for (let j = 1; j <= 10; j++) {
        let tableCell = document.createElement('td');
        tableCell.innerHTML = i * 10 + j;
        tableCell.style.cssText = cellStyle;
        tableRow.append(tableCell);
    }
    table.append(tableRow);
}
