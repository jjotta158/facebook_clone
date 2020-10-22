'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
    posts() {
        return this.hasMany('App/Models/Post','id','user_that_has_posted_id');
    }
}

module.exports = User
