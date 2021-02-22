<template>
  <div id="app">
    <h1>Criação de Registro</h1>
    <person-input @onSave="savePerson"/>
    <person-search
      @clear="clearSearch"
      @search="searchName"
    />
    <person-list
      :people="people"
      @getPerson="searchPerson"
    />
  </div>
</template>

<script>
import moment from 'moment'
import PersonInput from './components/PersonInput'
import PersonSearch from './components/PersonSearch.vue'
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
    PersonSearch,
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
    },
    async clearSearch () {
      await this.refreshList()
    },
    searchName (name) {
      getPeople({ name })
        .then(({ items }) => {
          this.people = items
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
  display: flex;
  flex-direction: column;
}
</style>
