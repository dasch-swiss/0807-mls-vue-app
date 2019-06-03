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

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Musikgeschichte der Schweiz auf einen Klick: Das Musiklexikon der Schweiz (MLS)
        </h1>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">Warum ein neues Musiklexikon?</h2>

        <v-layout justify-center>
          Die Schweiz verfügt im Gegensatz zu anderen europäischen Ländern über kein modernes
          Nachschlagewerk zur Musikgeschichte. Die bestehenden Lexika sind veraltet und werden der Vielfalt und dem Reichtum
          des Musiklebens der Schweiz nicht gerecht. Ein neues, wissenschaftlich fundiertes Musiklexikon wird schon seit
          Jahrzehnten verlangt. Diese Forderung nach fundiertem Wissen über die Schweizer Musik hat mit dem 2012 in die
          Bundesverfassung aufgenommenen Artikel 67a zur Stärkung der musikalischen Bildung eine neue Aktualität gewonnen:
          Um die neue Verfassungsbestimmung umzusetzen braucht es ein zeitgemässes Informationssystem zur Schweizer
          Musikgeschichte auf wissenschaftlicher Basis. 
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home'
}
</script>
