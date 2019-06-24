<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Lemma</h3>
    </v-card-title>
    <v-card-text>
      <table>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasFamilyName')">
          <td>Nachname</td><td>:</td><td>{{ lemma.props['mls:hasFamilyName'][0].strval }}</td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasGivenName')">
          <td>Vorname</td><td>:</td><td><div>{{ lemma.props['mls:hasGivenName'][0].strval }}</div></td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasLemmaText')">
          <td>Lemma</td><td>:</td><td>{{ lemma.props['mls:hasLemmaText'][0].strval }}</td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasLemmaType')">
          <td>Typ</td><td>:</td><td>{{ lemma_type }}</td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasSex')">
          <td>Geschlecht</td><td>:</td><td>{{ has_sex }}</td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasCentury')">
          <td>Jahrhundert</td><td>:</td><td>{{ lemma.props['mls:hasCentury'][0].strval }}</td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasStartDate')">
          <td>Von</td><td>:</td><td>
          <span>{{ lemma.props['mls:hasStartDate'][0].strval }}</span>
          <span v-if="lemma.props.hasOwnProperty('mls:hasStartDateInfo')"> ({{lemma.props['mls:hasStartDateInfo'][0].strval}})</span></td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasEndDate')">
          <td>Bis</td><td>:</td><td>
          <span>{{ lemma.props['mls:hasEndDate'][0].strval }}</span>
          <span v-if="lemma.props.hasOwnProperty('mls:hasEndDateInfo')"> ({{lemma.props['mls:hasEndDateInfo'][0].strval}})</span>
        </td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasLemmaDescription')">
          <td>Beschreibung</td><td>:</td><td>{{ lemma.props['mls:hasLemmaDescription'][0].strval }}</td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasPseudonym')">
          <td>Pseudonym(e)</td><td>:</td><td><div v-for="tmp in lemma.props['mls:hasPseudonym']">{{ tmp.strval }}</div></td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasVariants')">
          <td>Variante(n)</td><td>:</td><td><div v-for="tmp in lemma.props['mls:hasVariants']">{{ tmp.strval }}</div></td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasViaf')">
          <td>VIAF</td><td>:</td><td><v-btn color="info" :href="'https://viaf.org/' + lemma.props['mls:hasViaf'][0].strval">{{ lemma.props['mls:hasViaf'][0].strval }}</v-btn></td>
        </tr>
        <tr v-if="lemma.props.hasOwnProperty('mls:hasGnd')">
          <td>GND</td><td>:</td><td><v-btn color="info" :href="'http://d-nb.info/gnd/' + lemma.props['mls:hasGnd'][0].strval">{{ lemma.props['mls:hasGnd'][0].strval }}</v-btn></td>
        </tr>
      </table>
      <div>Erscheint in:</div>
      <lexfromlemma v-bind:lemmairi="this.$route.params.iri"
                    v-bind:lexiconiri="this.$route.query.lexicon">
      </lexfromlemma>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import {simplify_resource} from '../lib/jsonld_simplifier';
import lexfromlemma from './LexFromLemma';

export default {
  name: 'lemma',
  components: {
    lexfromlemma
  },
  data: function() {
    return {
      lemma: {
        props: {}
      },
      lemma_type: undefined,
      has_sex: undefined,
      lexicon_iri: undefined,
      lexicon: {
        props: {gaga: 'gaga'}
      },
      server: this.$env.get('SERVER'),
      ontology: this.$env.get('ONTOLOGY'),
    }
  },
  methods: {
    getResourceData: function (iri) {
      axios({
        method: 'get',
        url: this.server + '/v2/resources/' + encodeURIComponent(iri),
      }).then(
        response => {
          this.lemma = simplify_resource(response.data);
          if (this.lemma.props.hasOwnProperty('mls:hasLemmaType')) {
            axios({
              method: 'get',
              url: this.server + '/v2/node/' + encodeURIComponent(this.lemma.props['mls:hasLemmaType'][0].node_iri),
            }).then(
              response => {
                this.lemma_type = response.data['rdfs:label'];
              }
            ).catch(function(error) {
              console.log(error);
            })
          }
          if (this.lemma.props.hasOwnProperty('mls:hasSex')) {
            axios({
              method: 'get',
              url: this.server + '/v2/node/' + encodeURIComponent(this.lemma.props['mls:hasSex'][0].node_iri),
            }).then(
              response => {
                this.has_sex = response.data['rdfs:label'];
              }
            ).catch(function(error) {
              console.log(error);
            })
          }
        }
      ).catch(function (error) {
        console.log(error);
      })
    },
  },
  mounted () {
    this.getResourceData(this.$route.params.iri, 'lemma');
  }
}
</script>
