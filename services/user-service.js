const fs = require('fs');
const users = require('../users'); 

const updateUser = function (uId, uName, uAge) {
    const user = {
        id: uId,
        name: uName,
        age: uAge,
    };
    if (users.includes(user)) {
        users[uId].name = uName;
        users[uId].age = uAge;
    }
    else {
        throw new Error('There is no such user');
    }
    return users;
}
const createUser = function (uName, uAge) {
    const user = {
        name: uName,
        age: uAge,
    };
    if (users.length == 0) {
        user.id = 1;
        users.push(user);
    }
    else {
        user.id = users[users.length - 1].id + 1;
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
}
