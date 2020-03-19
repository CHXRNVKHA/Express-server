const User = require('../models/user');

const add = async function (req) {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    return {user, token}  
}

const get = async function(){
    return await User.find({})
}