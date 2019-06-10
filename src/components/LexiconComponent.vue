<template>
  <div>
    <table>
      <tr><td>Kürzel</td><td>:</td><td>{{ lexicon.props.hasOwnProperty('mls:hasShortname') ? lexicon.props['mls:hasShortname'][0].strval : '?' }}</td></tr>
      <tr><td>Zitierform</td><td>:</td><td>{{ lexicon.props.hasOwnProperty('mls:hasCitationForm') ? lexicon.props['mls:hasCitationForm'][0].strval : '?' }}</td></tr>
      <tr><td>Jahr</td><td>:</td><td>{{ lexicon.props.hasOwnProperty('mls:hasYear') ?  lexicon.props['mls:hasYear'][0].strval : '?' }}</td></tr>
      <tr><td>Kommentar</td><td>:</td><td>{{ lexicon.props.hasOwnProperty('mls:hasLexiconComment') ? lexicon.props['mls:hasLexiconComment'][0].strval : '?' }}</td></tr>
      <tr><td>Link KVK</td><td>:</td><td>{{ lexicon.props.hasOwnProperty('mls:hasLexiconWebLink') ? lexicon.props['mls:hasLexiconWebLink'][0].strval : '?' }}</td></tr>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router';
  import {simplify_resource} from '../lib/jsonld_simplifier';

  export default {
    name: "lexicon",
    data: function() {
      return {
        lexicon: {
          props: {}
        }
      }
    },
    props: {
      iri: String
    },
    methods: {
      getLexiconData: function (iri) {
        axios({
          method: 'get',
          url: 'https://api.dasch.swiss/v2/resources/' + encodeURIComponent(iri),
        }).then(
          response => (this.lexicon = simplify_resource(response.data))
        ).catch(function (error) {
          this.$nextTick(()=>{
            console.log(error);
          })
        })
      }
    },
    mounted () {
      this.getLexiconData(this.iri);
    }

  }
</script>

<style scoped>

</style>