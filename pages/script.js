const getUsers = async function () {
    const response = await fetch('/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    });
    let users = await response.json();
    const tableBody = document.querySelector('#mainTable tbody');
    const row = document.createElement('tr');
    users.forEach(element => {
        const idCol = document.createElement('th');
        const nameCol = document.createElement('th');
        const ageCol = document.createElement('th');
        idCol.innerText = element.id;
        nameCol.innerText = element.name;
        ageCol.innerText = element.age;
        row.appendChild(idCol);
        row.appendChild(nameCol);
        row.appendChild(ageCol);
        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", getUsers);