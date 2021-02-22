<template>
  <div class="row-search">
    <input
      v-model="partial"
      id="partial"
      name="partial"
      type="text"
      placeholder="Peter"
      class="partial-name-field"
    />
    <button
      @click.prevent="clear"
      class="btn"
    >
      Limpar
    </button>
    <button
      @click.prevent="search"
      class="btn"
    >
      Buscar
    </button>
  </div>
</template>

<script>
export default {
  name: 'PersonSearch',
  data: () => ({
    partial: ''
  }),
  methods: {
    clear () {
      this.partial = ''
      this.$emit('clear')
    },
    search () {
      this.$emit('search', this.partial)
    }
  }
}
</script>

<style>
.row-search {
  box-shadow:
    0 3px 6px rgba(0,0,0,0.16),
    0 3px 6px rgba(0,0,0,0.23);
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em auto;
  border-radius: .5em;
  width: 100%;
  padding: .1em;
}

.partial-name-field {
  width: 40%;
  margin: .5em .1em;
}

.btn {
  text-justify: center;
  width: 25%;
  margin: .5em .1em;
}

@media (min-width: 600px) {
  .row-search {
    width: 49%;
    padding: .5em;
  }

  .partial-name-field {
    width: 60%;
    margin: .5em .1em;
  }

  .btn {
    width: 15%;
    margin: .5em .1em;
  }
}
</style>
