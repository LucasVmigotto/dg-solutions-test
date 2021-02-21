<template>
  <div id="form">
    <form>
      <div class="field">
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
      <div class="field">
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
      <div class="field">
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
  box-shadow:
    0 3px 6px rgba(0,0,0,0.16),
    0 3px 6px rgba(0,0,0,0.23);
}

.field {
  margin: 1.5em 0;
}
</style>
