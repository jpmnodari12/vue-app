<template>
  <v-slide-y-transition mode="out-in">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 md6 offset-md3>
          <v-form v-on:submit.prevent="doLogin">
            <h1>Login</h1>
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="pwHidden ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (pwHidden = !pwHidden)"
              :type="pwHidden ? 'password' : 'text'"
              label="Senha"
              counter
            ></v-text-field>
            <v-btn class="primary" @click.prevent="doLogin" type="submit">Sign In</v-btn>
            <v-spacer></v-spacer>
              Não tem conta?
              <router-link to="/register" class="link mt-4">Clique aqui para Registrar</router-link>
          </v-form>
         
           
        </v-flex>
      </v-layout>
      
    </v-container>
  </v-slide-y-transition>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    pwHidden:true,
    email: '',
    password: '',
    loading: false
  }),
  mounted () {
    if (process.env.NODE_ENV === 'development') {
      this.email = process.env.VUE_APP_LOGIN_EMAIL
      this.password = process.env.VUE_APP_LOGIN_PASS
    }
  },
  methods: {
    async doLogin () {
      this.loading = true
      const { email, password } = this
      try {
        const res = await this.$firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
        window.uid = res.user.uid
        this.$router.push({ name: 'home' })
      } catch (err) {
        let message = ''
        switch (err.code) {
          case 'auth/user-not-found':
            message = 'Não foi possível localizar o usuário.'
            break
          case 'auth/wrong-password':
            message = 'Senha inválida'
            break
          default:
            message = 'Não foi possível fazer login, tente novamente'
        }
        this.$root.$emit('Notification::show', {
          message,
          type: 'danger'
        })
      }
      this.loading = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}
</script>

<style>

</style>
