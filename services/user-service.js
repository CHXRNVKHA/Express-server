const fs = require('fs');
const users = require('../users');

const defUsersStorageName = 'users.json';

const saveChanges = function () {
    fs.writeFileSync(defUsersStorageName, JSON.stringify(users));
    return 'Your data has been saved';
}
const deleteUser = function (uId) {
    users.forEach(element => {
        if (element.id == uId) {
            element.deleteAt = Date.now();
        }
    });
    return users;
}
const updateUser = function (uId, uName, uAge) {
    users.forEach(element => {
        if (element.id == uId) {
            element.name = uName;
            element.age = uAge;
        }
    });
    return users;
}
const createUser = function (uName, uAge) {
    users.forEach(element => {
        if (element.name === uName) throw new Error('This user name already exist, choose another');
    });
    const user = {
        name: uName,
        age: uAge,
    };
    if (users.length == 0) {
        user.id = 1;
        user.deleteAt = null;
        users.push(user);
    }
    else {
        user.id = users[users.length - 1].id + 1;
        user.deleteAt = null;
        users.push(user);
    }
    return users;
}

const getUsers = function () {
    if (users) return users;
    throw new Error('users list is empty');
}

const getUserById = function (id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return users[i];
        }
    }
    throw new Error('user not found');
}

module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    saveChanges,
}
