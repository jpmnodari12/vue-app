<template>
  <v-dialog max-width="600px">
    <v-btn flat slot="activator" class="success">Adicionar dispositivo</v-btn>
    <v-card>
      <v-card-title>
        <h2>Adicionar dispositivo</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field v-model="nome" label="Nome" prepend-icon="edit" :rules="inputRules"></v-text-field>
          <v-text-field v-model="iddispositivo" label="Id dispositivo" prepend-icon="mdi-access-point" :rules="inputRules"></v-text-field>

          <v-spacer></v-spacer>

          <v-btn flat @click="submit" class="success mx-0 mt-3">Adicionar dispositivo</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data() {
    return {
      nome: '',
      iddispositivo: '',
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 3 || 'Minimum length is 3 characters'
      ]
    }
  },
  methods: {
    async submit() {
      if(this.$refs.form.validate()) {
        console.log(this.title, this.iddispositivo)
            const ref = this.$firebase.database().ref(`/${window.uid}/Dispositivos`) //o uid é a referencia
            const id = this.iddispositivo
            const nome = this.nome
        const payload = {
          nome
        }
        ref.child(id).set(payload)
      }
    }
  },
}
</script>
