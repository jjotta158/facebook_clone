'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments();
      table.string('title',80).notNullable();
      table.text('content').notNullable();
      table.text('marked_people_ids');
      table.integer('user_that_has_posted_id').notNullable().unique();
      table.timestamps();
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
