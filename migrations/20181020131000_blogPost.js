exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogPost', function(table) {
    // TABLE COLUMN DEFINITIONS
    table.increments() //id field, auto pk
    table.string('title').notNullable()
    table.text('content').notNullable()
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('blogPost')
}
