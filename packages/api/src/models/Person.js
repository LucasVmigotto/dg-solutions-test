const { gql } = require('apollo-server-express')
const { camelizeKeys } = require('humps')

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
    },
    async people (_, { limit = 100, offset = 0 }, { knex }) {
    }
  },
  Mutation: {
    async persistPerson (_, { personId, input }, { knex }) {
    },
    async deletePerson (_, { personId }, { knex }) {
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
