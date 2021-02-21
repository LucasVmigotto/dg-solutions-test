<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Data de Nascimento</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(el, index) in people"
          :key="index"
        >
          <td>{{ el.name }}</td>
          <td>{{ formatDate(el.birthDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PersonList',
  props: {
    people: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate: (date, pattern = 'DD/MM/YYYY') =>
      moment(date).format(pattern)
  },
}
</script>

<style>

</style>
