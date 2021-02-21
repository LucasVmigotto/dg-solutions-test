<template>
  <div id="form">
    <form>
      <div id="name-field">
        <label for="name">
          Nome:
        </label>
        <input
          v-model="name"
          id="name"
          name="name"
          type="text"
        />
      </div>
      <div id="birth-field">
        <label for="birthDate">
          Data de nascimento:
        </label>
        <input
          v-model="birthDate"
          id="birthDate"
          name="birthDate"
          type="date"
        />
      </div>
      <div id="button">
        <button
          :disabled="isDisabled"
          @click.prevent="savePerson"
        >
          Cadastrar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PersonInput',
  data: () => ({
    name: '',
    birthDate: ''
  }),
  computed: {
    isDisabled () {
      return !this.name ||
        this.name.length < 1 ||
        this.birthDate === ''
    }
  },
  methods: {
    savePerson () {
      const input = {
        name: this.name,
        birthDate: new Date(`${this.birthDate}T12:00:00`).toISOString()
      }
      this.name = ''
      this.birthDate = ''
      this.$emit('onSave', input)
    }
  },
}
</script>

<style>
#form {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
              0 3px 1px -2px rgba(0, 0, 0, .2),
              0 1px 5px 0 rgba(0, 0, 0, .12);
}
</style>
