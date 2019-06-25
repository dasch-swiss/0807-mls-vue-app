<template>
  <v-container grid-list-xl>
    <v-layout justify-center>
      Die Information und der Zugang zu bereits publizierten oder Online gestellten Lexika
    </v-layout>
    <div>

    </div>
    <v-layout align-center justify-space-between fill-height column>
      <v-flex mb-4>
        <v-btn color="info" to="/lemmata">
          Lemmata
        </v-btn>
      </v-flex>
      <v-flex mb-4>
        <v-btn color="info" to="/lexicons">
          Lexika
        </v-btn>
      </v-flex mb-4>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Start",
    data: function() {
      return {}
    },

  }
</script>

<style scoped>

</style>
