<template>
  <v-card>
    <v-card-text>
      <p>
        Schweizerische Musikforschende Gesellschaft<br/>
        Prof. Dr. Cristina Urchueguía (Vorsitz)<br/>
        Institut für Musikwissenschaft<br/>
        Mittelstrasse 43<br/>
        3012 Bern<br/>
        Tel.: 031 631 50 30<br/>
        E-Mail: <a href="mailto:urchueguia@musik.unibe.ch">urchueguia@musik.unibe.ch</a><br/>
        Webseite: <a href="https://www.smg-ssm.ch">www.smg-ssm.ch</a><br/>
      </p>
      <p>
        Informationen zum Projekt erhalten Sie unter:<br/>
        <a href="https://www.smg-ssm.ch/smg-ssm/forschungs-publikationen/musiklexikon-der-schweiz/">https://www.smg-ssm.ch/smg-ssm/forschungs-publikationen/musiklexikon-der-schweiz/</a>
      </p>
      <p>Informationen zur Gesellschaft und zum aktuellen Programm aller Sektionen finden Sie unter:<br/>
        <a href="https://www.smg-ssm.ch">www.smg-ssm.ch</a>
      </p>

      <h2>Im Auftrag von</h2>
      <p>Schweizer Musikrat SMR</p>

      <h2>Kooperationspartner</h2>
      <p>
        <v-layout row wrap>
        <v-flex xs2>
          <v-img
            :src="require('../assets/logo-sagw.svg')"
            contain
            max-width="128" max-height="128">

          </v-img>
        </v-flex>
        <v-flex xs2>
          <v-img
            :src="require('../assets/DaSCH_Logo_RGB.png')"
            contain
            max-width="128" max-height="128">
          </v-img>
        </v-flex>
        <v-flex xs2>
          <v-img
            :src="require('../assets/Unibe_Logo_16pt_RGB_201807_o_R_l.png')"
            contain
            max-width="128" max-height="128">

          </v-img>
        </v-flex>
        <v-flex xs2>
          <v-img
            :src="require('../assets/metagrid_logo-250@2x.png')"
            contain
            max-width="128" max-height="128">
          </v-img>
        </v-flex>
        <v-flex xs2>
          <v-img
            :src="require('../assets/histhub.svg')"
            contain
            max-width="128" max-height="128"
          ></v-img>
        </v-flex>
        <v-flex xs2>
          <v-img
            :src="require('../assets/Suisa_Logo.svg.png')"
            contain
            max-width="128" max-height="128">
          </v-img>
        </v-flex>
        </v-layout>
      </p>

      <p>Logo Design: Margrit Hänni</p>

    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "About"
  }
</script>

<style scoped>

</style>
