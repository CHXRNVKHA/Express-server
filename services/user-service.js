const fs = require('fs');

let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

const getUserById = function (id) {
    const id = this.id;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return users[i];
        }
    }
    throw new Error('user not found');
}

module.exports = {
    getUserById,
}
