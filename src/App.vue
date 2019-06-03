<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-link to="/">Home</router-link> |
      <router-link to="/projects">Projekte</router-link> |
      <router-link to="/lexicons">Lexika</router-link> |
      <router-link to="/lemmata">Lemmata</router-link> |
      <router-link to="/helloworld">HelloWorld</router-link>

      <div>
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>


