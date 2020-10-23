'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Helpers = use('Helpers')

class Image extends Model {

    static async getAvatarLink(avatar,image_name) {
        if (!Image.moveAvatar(avatar,image_name)) {
            throw new Error('falha no upload da imagem')
        } else {
            return `${Helpers.tmpPath('perfis_image')}/${image_name}`;
        }

    }

    static async moveAvatar(avatar, image_name) {
        await avatar.move(Helpers.tmpPath('perfis_image'), {
            name: `${image_name}.jpg`,
            overwrite: true
        })

        if (!avatar.moved()) {
            console.log(avatar.error());
            return false
        }
        return true;
    }
}

module.exports = Image
