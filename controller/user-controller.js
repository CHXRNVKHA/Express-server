const service = require('../services/user-service');
class UserController {
    constructor(){}
    getUser = async (req, res) => {
        try {
            const result = await service.get()
            res.send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
}

module.exports = UserController;