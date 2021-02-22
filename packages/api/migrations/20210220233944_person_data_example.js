
exports.up = knex => {
  return knex('person')
    .insert({
      name: 'John Doe',
      birth_date: new Date().toISOString()
    })
}

exports.down = knex => {
  return knex('person')
    .del()
}
