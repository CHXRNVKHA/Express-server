const tableBody = document.querySelector('#mainTable tbody');
const form = document.querySelector("form");

const defUpdateBtnText = 'Update';

const addTableRow = function (id, name, age, tBody) {
    const row = document.createElement('tr');
    const idCol = document.createElement('th');
    const nameCol = document.createElement('th');
    const ageCol = document.createElement('th');
    const updateCol = document.createElement('th');
    const updateBtn = document.createElement('button');
    updateBtn.innerText = defUpdateBtnText;
    updateBtn.className = 'updateBtn';
    updateCol.appendChild(updateBtn);
    idCol.innerText = id;
    nameCol.innerText = name;
    ageCol.innerText = age;
    row.appendChild(idCol);
    row.appendChild(nameCol);
    row.appendChild(ageCol);
    row.appendChild(updateBtn);
    tBody.appendChild(row);
}

const getUsers = async function () {
    const response = await fetch('/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
    let users = await response.json();
    users.forEach(element => {
       addTableRow(element.id, element.name, element.age, tableBody);
    });
}

const createUser = async function (event) {
    event.preventDefault();
    const userName = this.elements['name'].value;
    const userAge = this.elements['age'].value;
    const response = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            name: userName,
            age: userAge,
        })
    });
    const users = await response.json();
    const lastUser = users[users.length - 1];
    addTableRow(lastUser.id, lastUser.name, lastUser.age, tableBody);
}

const updateUser = async function (event) {
    event.preventDefault();
    if (event.target.className == 'updateBtn') {
        const userName = form.elements['name'].value;
        const userAge = form.elements['age'].value;
        const userId = event.target.parentElement.cells[0].innerText;
        const response = await fetch('/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                id: userId,
                name: userName,
                age: userAge,
            })
        });
    }
}

document.addEventListener('DOMContentLoaded', getUsers);
form.addEventListener('submit', createUser);
tableBody.addEventListener('click', updateUser);