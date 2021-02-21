<template>
  <div id="app">
    <h1>Criação de Registro</h1>
    <person-input @onSave="savePerson"/>
    <person-list :people="people"/>
  </div>
</template>

<script>
import PersonInput from './components/PersonInput'
import PersonList from './components/PersonList.vue'
import {
  createPerson,
  getPeople
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
          if (res) {
            await this.refreshList()
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
