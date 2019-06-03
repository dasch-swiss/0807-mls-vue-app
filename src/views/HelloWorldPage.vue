<template>
  <v-content>
    <HelloWorldComponent></HelloWorldComponent>
  </v-content>
</template>

<script>
import HelloWorldComponent from '../components/HelloWorldComponent'

export default {
  name: 'HelloWorldPage',
  components: {
    HelloWorldComponent
  }
}
</script>
