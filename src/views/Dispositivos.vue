<template>
  <div class="dispositivo">
    <h1 class="subheading grey--text">Dispositivos</h1>

    <v-container class="my-5">     
      <v-card flat v-for="dispositivo in dispositivos" :key="dispositivo.nome">
        <v-layout row wrap :class="`pa-3 dispositivo ${dispositivo.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Nome dispositivo</div>
            <div>{{ dispositivo.nome }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :class="`${dispositivo.status} white--text my-2 caption`">{{ dispositivo.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
   
  </div>
</template>

<script>

export default {
  data: () => ({
    dispositivos: []
  }),
  created () {
    this.getData()
  },
  
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}/Dispositivos`)

      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.dispositivos = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style>

.dispositivo.working{
  border-left: 4px solid #3cd1c2;
}
.dispositivo.notworking{
  border-left: 4px solid #f83e70;
}
.v-chip.working{
  background: #3cd1c2;
}
.v-chip.notworking{
  background: #f83e70;
}

</style>
