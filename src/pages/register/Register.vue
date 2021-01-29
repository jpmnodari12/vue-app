<template>
  <v-card class="px-4">
      <v-card-text>
          <v-form v-on:submit.prevent="register()">
              <v-row>
                  <v-col cols="12">
                      <v-text-field required type="email" v-model="email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                      <v-text-field required type="password" v-model="password" label="Senha"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                      <v-text-field required type="password" v-model="registrationPassword" label="Confirme a senha" ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                      <v-btn class="primary" @submit.prevent="register()" type="submit">Register</v-btn>
                  </v-col>
              </v-row>
                <router-link to="/login" class="link mt-4">Voltar ao login</router-link>
          </v-form>
      </v-card-text>
  </v-card>
</template>

<style>

</style>

<script>
export default {
  name: 'Register',
  data: () => {
    return {
      loading: false,
      email: '',
      password: '',
      registrationPassword: ''
    }
  },
  methods: {
    async register () {
      this.loading = true
      const { email, password, registrationPassword } = this

      try {
        if (password === registrationPassword) {
          const res = await this.$firebase.auth()
            .createUserWithEmailAndPassword(email, password)

          this.$router.push({ name: 'Login' })
        } else {
          let message = 'Senhas diferentes, por favor, tente de novo.'
          this.$root.$emit('Notification::show', {
            message,
            type: 'danger'
          })
          this.password = '' // Limpa o input de senha
          this.registrationPassword = '' // Limpa o input de senha
        }
      } catch (err) {
        let message = ''

        switch (err.code) {
          case 'auth/email-already-in-use':
            message = 'O endereço de e-mail já está em uso por outra conta.'
            this.email = '' // Limpa o input de E-mail
            break
          case 'auth/wrong-password':
            message = 'Senha inválida'
            break
          default:
            message = 'Não foi possível criar a conta, tente novamente'
        }

        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }

      this.loading = false
    }
  }
}
</script>
