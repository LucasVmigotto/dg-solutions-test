<template>
  <div id="list">
    <table class="table">
      <thead>
        <tr>
          <th
            class="th"
            id="col-name"
          >
            Nome
          </th>
          <th
            class="th"
            id="col-birth"
          >
            Data de Nascimento
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(el, index) in people"
          :key="index"
        >
          <td class="td">
            {{ el.name }}
          </td>
          <td class="td">
            {{ formatDate(el.birthDate) }}
          </td>
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
#list {
  margin: 1.5em 0;
}

.table {
  box-shadow:
    0 3px 6px rgba(0,0,0,0.16),
    0 3px 6px rgba(0,0,0,0.23);
  margin: 0 auto;
  border-radius: .5em;
  width: 100%;
  padding: 1em;
}

.th {
  padding: 1em 0;
}

#col-name {
  width: 70%;
}

#col-birth {
  width: 30%;
}

.td {
  padding: 1em 0 .3em 0;
  border-bottom: .1em #2c3e50 solid;
}

@media (min-width: 600px) {
  .table {
    width: 50%;
  }
}
</style>
