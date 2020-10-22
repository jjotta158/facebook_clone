'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('name', 100).notNullable();
      table.string('email',100).notNullable().unique();
      table.string('password').notNullable();
      table.text('description');
      table.text('avatarLink');
      table.json('friends_id_list');      
      table.string('birth_date').notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UsersSchema
