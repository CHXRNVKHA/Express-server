const fs = require('fs');
const users = require('../users'); 

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
}
