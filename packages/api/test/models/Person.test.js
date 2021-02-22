const {
  expect,
  request,
  handleResponseError
} = require('../utils')
const config = require('../../src/config')
const createApp = require('../../src/app')

/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
describe('Models:Person', function () {
  let knex, httpServer

  before(function () {
    const {
      knex: localKnex,
      httpServer: localHttpServer
    } = createApp(config)

    knex = localKnex
    httpServer = localHttpServer
  })

  after(async function () {
    await knex.destroy()
  })

  describe('Queries', function () {
    let person = null
    it('people', async function () {
      const query = `
        query {
          people(limit: 100, offset: 0) {
            count
            items {
              personId
              name
              birthDate
              createAt
              updateAt
            }
          }
        }
      `

      const {
        body: {
          data: {
            people: { count, items }
          }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({ query })
        .then(handleResponseError)

      person = { ...items[0] }

      expect(count).to.be.not.null
      expect(count).to.be.an('number')
      expect(items).to.be.not.null
      expect(items).to.be.an('array')
    })

    it('person', async function () {
      const query = `
        query ($personId: ID!) {
          person (personId: $personId) {
            personId
            name
            birthDate
            createAt
            updateAt
          }
        }
      `

      const {
        body: {
          data: { person: item }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: {
            personId: person.personId
          }
        })
        .then(handleResponseError)

      expect(item).to.be.not.null
      expect(item).to.have.property('personId')
      expect(item).to.have.property('name')
      expect(item).to.have.property('birthDate')
      expect(item).to.have.property('createAt')
      expect(item).to.have.property('updateAt')
    })
  })

  describe('Mutations', function () {
    let person = null

    it('persistPerson (create)', async function () {
      const body = {
        query: `
          mutation ($input: PersonInput!) {
            persistPerson(input: $input) {
              personId
              name
              birthDate
              createAt
              updateAt
            }
          }
        `,
        variables: {
          input: {
            name: 'John Doe Test',
            birthDate: new Date().toISOString()
          }
        }
      }

      const {
        body: {
          data: { persistPerson }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send(body)
        .then(handleResponseError)

      person = { ...persistPerson }

      expect(person).to.be.not.null
      expect(person).to.be.an('object')
      expect(person).to.have.property('name')
      expect(person).to.have.property('birthDate')
      expect(person).to.have.property('createAt')
      expect(person).to.have.property('updateAt')
    })

    it('persistPerson (update)', async function () {
      const body = {
        query: `
          mutation ($personId: ID, $input: PersonInput!) {
            persistPerson(personId: $personId, input: $input) {
              personId
              name
              birthDate
              createAt
              updateAt
            }
          }
        `,
        variables: {
          personId: person.personId,
          input: {
            name: 'John Doe Test CHANGED',
            birthDate: new Date().toISOString()
          }
        }
      }
      const {
        body: {
          data: { persistPerson }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send(body)
        .then(handleResponseError)

      expect(persistPerson).to.be.not.null
      expect(persistPerson).to.be.an('object')
      expect(persistPerson).to.have.property('createAt')
      expect(persistPerson).to.have.property('updateAt')
      expect(persistPerson.createAt).to.be.not.equal(persistPerson.updateAt)
    })

    it('deletePerson', async function () {
      const query = `
        mutation ($personId: ID!) {
          deletePerson(personId: $personId)
        }
      `
      const {
        body: {
          data: { deletePerson }
        }
      } = await request(httpServer)
        .post(config.ENDPOINT)
        .send({
          query,
          variables: {
            personId: person.personId
          }
        })
        .then(handleResponseError)

      expect(deletePerson).to.be.not.null
      expect(deletePerson).to.be.true
    })
  })
})
