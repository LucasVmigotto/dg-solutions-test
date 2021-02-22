module.exports = ({ endpoint, readFile }) => ({
  endpoint,
  name: 'Person',
  query: readFile('./person.gql')
})
