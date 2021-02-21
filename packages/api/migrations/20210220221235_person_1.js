
exports.up = async knex => {
  await knex.schema.createTable('person', t => {
    t.increments('person_id')
    t.string('name', 250).notNullable()
    t.timestamp('birth_date').notNullable()
    t.timestamp('create_at').defaultTo(knex.fn.now())
    t.timestamp('update_at').defaultTo(knex.fn.now())
  })
}

exports.down = knex => {
  return knex.schema.dropTable('person')
}
