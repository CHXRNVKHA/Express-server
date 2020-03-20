const service = require('../services/user-service');
class UserController {
    constructor(){};
    getUsers = async (req, res) => {
        try {
            const result = await service.getUsers();
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    getUserById = async (req, res) => {
        try {
            const result = await service.getUserById(req.params.id);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}

module.exports = UserController;