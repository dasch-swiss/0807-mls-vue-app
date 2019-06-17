<template>
  <v-app>
    <v-toolbar dense>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Musiklexikon der Schweiz (MLS)</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        to="/"
      >
        <span class="mr-1">Home</span>
      </v-btn>
      <v-btn
        flat
        to="/lexicons"
      >
        <span class="mr-1">Lexica</span>
      </v-btn>
      <v-btn
        flat
        to="/lemmata"
      >
        <span class="mr-1">Lemmata</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <div>
        <router-view/>
      </div>
    </v-content>
  </v-app>
</template>


