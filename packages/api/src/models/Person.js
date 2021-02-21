const { gql } = require('apollo-server-express')
const { camelizeKeys, decamelizeKeys } = require('humps')

const typeDefs = gql`
  type Person {
    personId: ID!
    name: String!
    birthDate: DateTime!
    createAt: DateTime!
    updateAt: DateTime!
  }

  type PersonList {
    count: Int!
    items: [Person]!
  }

  input PersonInput {
    name: String!
    birthDate: DateTime!
  }

  extend type Query {
    person(personId: ID!): Person!
    people(limit: Int, offset: Int): PersonList!
  }

  extend type Mutation {
    persistPerson(personId: ID, input: PersonInput!): Person!
    deletePerson(personId: ID!): Boolean!
  }
`

const resolvers = {
  Query: {
    async person (_, { personId }, { knex }) {
      const [data] = await knex('person')
        .select(
          'person_id',
          'name',
          'birth_date',
          'create_at',
          'update_at'
        )
        .where({ person_id: personId })
        return camelizeKeys(data)
    },
    async people (_, { limit = 100, offset = 0 }, { knex }) {
      const [data] = await knex('person')
        .select(
          'person_id',
          'name',
          'birth_date',
          'create_at',
          'update_at'
        )
        .limit(limit)
        .offset(offset)

      const [{ count }] = await knex('person').count('person_id')

      return {
        count,
        items: data.map(el => camelizeKeys(el))
      }
    }
  },
  Mutation: {
    async persistPerson (_, { personId, input }, { knex }) {
      if (personId) {
        const [person] = knex('person')
          .update(decamelizeKeys({
            ...input,
            updateAt: new Date().toISOString()
          }))
          .where({ person_id: personId })
          .returning('*')

          return camelizeKeys(person)
      } else {
        const [person] = knex('person')
          .insert(decamelizeKeys({
            ...input
          }))
          .returning('*')

        return camelizeKeys(person)
      }
    },
    async deletePerson (_, { personId }, { knex }) {
      const data = await knex('person')
        .where({ person_id: personId })
        .del()

      return !!data
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
