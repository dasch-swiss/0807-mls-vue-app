<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/mls-logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-layout justify-center>
        <v-list>
          <v-list-tile to="/start">
            <v-list-tile-content>
              <v-list-tile-title>Musikgeschichte der Schweiz auf einem Klick: Die bestehenden Lexika</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/info">
            <v-list-tile-content>
              <v-list-tile-title>Das Projekt: Ein neues Musiklexikon mit gutem Gedächtnis</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/about">
            <v-list-tile-content>
              <v-list-tile-title>Über uns / Impressum</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home'
}
</script>
