const service = require('../services/user-service');
class UserController {
    constructor(){};
    deleteUser = async (req, res) => {
        try {
            const result = await service.deleteUser(req.body.id);
            res.send(result);
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    updateUser = async (req, res) => {
        try {
            const result = await service.updateUser(req.body.id, req.body.name, req.body.age);
            res.send(result);
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    }
    createUser = async (req, res) => {
        try {
            const result = await service.createUser(req.body.name, req.body.age);
            res.send(result);
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    }
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