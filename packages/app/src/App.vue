<template>
  <div id="app">
    <h1>Criação de Registro</h1>
    <person-input @onSave="savePerson"/>
    <person-list
      :people="people"
      @getPerson="searchPerson"
    />
  </div>
</template>

<script>
import moment from 'moment'
import PersonInput from './components/PersonInput'
import PersonList from './components/PersonList.vue'
import {
  createPerson,
  getPeople,
  getPerson
} from './api/queries/person'

export default {
  name: 'App',
  components: {
    PersonInput,
    PersonList
  },
  async created() {
    await this.refreshList()
  },
  data: () => ({
    people: []
  }),
  methods: {
    refreshList ({ limit = 100, offset = 0 } = {}) {
      getPeople({ limit, offset })
        .then(({ items }) => {
          this.people = items
        })
    },
    savePerson (input) {
      createPerson(input)
        .then(async (res) => {
          if (res && res.personId) {
            await this.refreshList()
          }
        })
    },
    searchPerson (personId) {
      getPerson(personId)
        .then((res) => {
          if (res && res.personId) {
            const {
              name, birthDate, createAt
            } = res
            alert(`
              Nome: ${name}
              Data de Nascimento: ${moment(birthDate).format('DD/MM/YYYY')}
              Criado em ${moment(createAt).locale('pt-BR').format('LLLL')}
            `)
          }
        })
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
</style>
