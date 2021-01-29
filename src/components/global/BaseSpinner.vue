<template>
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
</template>

<script>
export default {
  data () {
    return {
      visible: true
    }
  },
  created () {
    this.$root.$on('Spinner::show', () => { this.visible = true })
    this.$root.$on('Spinner::hide', () => { this.visible = false })
  }
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
