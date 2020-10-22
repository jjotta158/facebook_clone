'use strict'

const User = use('App/Models/User');

class UserController {
    async login({request, response}) {
        const {email, password} = request.body;

        const user = await User.findBy('email', email);
        if(user != {} && user != undefined && user != null && user != '') {
            if(user.password == password) {
                response.status(200).json(user)
            } else {
                response.status(402).json({message:'wrong password'})
            }
        } else {
            response.status(404).json({message:'user not founded' })
        }
    }
}

module.exports = UserController
