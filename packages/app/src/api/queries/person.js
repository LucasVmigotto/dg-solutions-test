import { gql } from '../gql'

const QUERY_GET_PERSON = `
  query ($personId: ID!) {
    person(personId: $personId) {
      personId
      name
      birthDate
      createAt
    }
  }
`

const QUERY_GET_PEOPLE = `
  query ($limit: Int, $offset: Int, $name: String) {
    people(limit: $limit, offset: $offset, name: $name) {
      count
      items {
        personId
        name
        birthDate
        createAt
      }
    }
}
`

const MUTATION_CREATE_PEOPLE = `
  mutation ($input: PersonInput!) {
    persistPerson(input: $input) {
      personId
    }
  }
`

const MUTATION_DELETE_PEOPLE = `
  mutation ($personId: ID!) {
    deletePerson(personId: $personId)
  }
`

export async function getPeople ({ limit = 100, offset = 0, name = '' } = {}) {
  const { people } = await gql(QUERY_GET_PEOPLE, { limit, offset, name })
  return { ...people }
}

export async function getPerson (personId) {
  const { person } = await gql(QUERY_GET_PERSON, { personId })
  return person
}

export async function createPerson (input) {
  const { persistPerson } = await gql(MUTATION_CREATE_PEOPLE, { input })
  return persistPerson
}

export async function deletePerson (personId) {
  const { deletePerson } = await gql(MUTATION_DELETE_PEOPLE, { personId })
  return deletePerson
}
