<template>
  <nav>

    <v-toolbar flat app>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">IoT</span>
        <span>TCC</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>


      <v-btn flat color="grey" @click="logout()">
        <span>Logout</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout column align-center>
        <v-flex class="mt-4 mb-3">
          <Popup/>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
import Popup from './Popup'

export default {
  components: { Popup },
  data() {
    return {
      drawer: false,
      links: [
        { icon: 'dashboard', text: 'Dashboard', route: '/' },
        { icon: 'mdi-access-point', text: 'Dispositivos', route: '/dispositivos' },
      ]
    }
  },
  methods: {
    async logout () {
      this.$root.$emit('Spinner::show')

      await this.$firebase.auth().signOut()

      this.$router.push({ name: 'Login' })

      this.$root.$emit('Spinner::hide')
    }    
  }
}
</script>

<style>

</style>
