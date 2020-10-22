'use strict'

const User = use('App/Models/User');
const Image = use('App/Models/Image');


class UserController {
    async signIn({
        request,
        response
    }) {
        const {
            email,
            password
        } = request.body;

        const user = await User.findBy('email', email);
        if (user != {} && user != undefined && user != null && user != '') {
            if (user.password == password) {
                response.status(200).json(user)
            } else {
                response.status(402).json({
                    message: 'wrong password'
                })
            }
        } else {
            response.status(404).json({
                message: 'user not founded'
            })
        }
    }

    async signUp({
        request,
        response
    }) {

        const {
            name,
            email,
            description,
            date_birth,
            password
        } = request.body;

        const avatar = request.file('avatar', {
            types: ['image'],
            size: '5mb'
        })


        const avatarLink = await Image.getAvatarLink(avatar, email);

        try {
            let user = new User();
            user.name = name;
            user.email = email;
            user.description = description;
            user.birth_date = date_birth;
            user.avatarLink = avatarLink;
            user.password = password;

            user.save();

            user = User.findBy('email', email);
            return response.status(200).json(user);
        } catch (error) {
            return response.status(400).send(`${error}`);
        }


    }
}

module.exports = UserController
