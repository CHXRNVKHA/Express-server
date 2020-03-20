const tableBody = document.querySelector('#mainTable tbody');
const form = document.querySelector("form");

const defUpdateBtnText = 'Update';
const defDelBtnText = 'Delete';
let usersTempStorage;

const createButton = function (inText, className) {
    const btn = document.createElement('button');
    btn.innerText = inText;
    btn.className = className;
    return btn;
}
const addTableRow = function (id, name, age, tBody) {
    const row = document.createElement('tr');
    const idCol = document.createElement('th');
    const nameCol = document.createElement('th');
    const ageCol = document.createElement('th');
    const updateCol = document.createElement('th');
    const deleteCol = document.createElement('th');
    const updateBtn = createButton(defUpdateBtnText, 'updateBtn');
    const deleteBtn = createButton(defDelBtnText, 'deleteBtn');
    updateCol.appendChild(updateBtn);
    deleteCol.appendChild(deleteBtn);
    idCol.innerText = id;
    nameCol.innerText = name;
    ageCol.innerText = age;
    row.appendChild(idCol);
    row.appendChild(nameCol);
    row.appendChild(ageCol);
    row.appendChild(updateCol);
    row.appendChild(deleteCol);
    tBody.appendChild(row);
}

const resetTable = async function (event) {
    if (event.target.id === 'reset') {
        tableBody.innerHTML = '';
        usersTempStorage.forEach(element => {
            if (element.deleteAt === null) {
                addTableRow(element.id, element.name, element.age, tableBody);
            }
        });
    }
}
const getUsers = async function () {
    const response = await fetch('/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
    const users = await response.json();
    usersTempStorage = users;
    users.forEach(element => {
        if (element.deleteAt === null) {
            addTableRow(element.id, element.name, element.age, tableBody);
        }
    });
}

const createUser = async function (event) {
    event.preventDefault();
    if (event.target.id === 'add') {
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
}

const updateUser = async function (event) {
    event.preventDefault();
    if (event.target.className == 'updateBtn') {
        const targetRow = event.target.parentElement.parentElement;
        const userName = form.elements['name'].value;
        const userAge = form.elements['age'].value;
        const userId = targetRow.cells[0].innerText;
        targetRow.cells[1].innerText = userName;
        targetRow.cells[2].innerText = userAge;
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

const deleteUser = async function (event) {
    event.preventDefault();
    if (event.target.className == 'deleteBtn') {
        const targetRow = event.target.parentElement.parentElement;
        const userId = targetRow.cells[0].innerText;
        targetRow.remove();
        const response = await fetch('/users', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                id: userId,
            })
        });
    }
}

const saveAllChanges = async function (event) {
    event.preventDefault();
    if (event.target.id === 'submit') {
        const response = await fetch('/users/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        });
        usersTempStorage = await response.json();
        alert('Data has been saved');
    }
}

document.addEventListener('DOMContentLoaded', getUsers);
form.addEventListener('click', saveAllChanges);
form.addEventListener('click', createUser);
form.addEventListener('click', resetTable);
tableBody.addEventListener('click', updateUser);
tableBody.addEventListener('click', deleteUser);