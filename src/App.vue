<template>
  <v-app>
    <v-toolbar dense>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Musiklexikon der Schweiz (MLS)</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="this.$route.path != '/' && this.$route.path != '/home'" flat @click="$router.go(-1)">
        <span class="mr-1"><v-icon>arrow_back</v-icon></span>
      </v-btn>
      <v-btn flat to="/start">
        <span class="mr-1">MLS</span>
      </v-btn>
        <v-btn flat to="/info">
          <span class="mr-1">Projekt</span>
        </v-btn>
        <v-btn flat to="/about">
          <span class="mr-1">Über uns</span>
        </v-btn>
      <v-btn flat to="/">
        <span class="mr-1"><v-icon>home</v-icon></span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <div>
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: "App"
  }
</script>
