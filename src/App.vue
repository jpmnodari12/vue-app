<template>
    <v-content class="mx-4 mb-4" v-if="isLogged">
      <v-app class="grey lighten-4">
        <Navbar/>
          <router-view/><router-view/>
      </v-app>
    </v-content>
    
    <router-view v-else/>
  
</template>

<script>
import Navbar from './components/layout/Navbar'
import Spinner from './components/global/BaseSpinner'

export default {
  components: { Navbar },
  name: 'App',
  data: () => ({ isLogged: false }),
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      //usa o listener para verificar auteração no estado da autenticação
      //Caso verifique existencia do usuário, altera estado de isLogged
      window.uid = user ? user.uid : null 
      this.isLogged = !!user

      //ta logado? é roteado para componente home, caso não é roteado para componente login
      this.$router.push({ name: window.uid ? 'home' : 'login' })

      setTimeout(() => {
        //timeout para conseguir vizualizar o spinner de maneira adequada
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>
