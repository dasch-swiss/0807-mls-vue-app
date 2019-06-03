<template>
  <div>
    <table>
    <tr><th>Lexikon</th><th>Jahr</th></tr>
    <tr v-on:click="gotoLexicon(lexicon.iri)"
      v-for="lexicon in lexicons"
      v-bind:key="lexicon.iri">
      <td>{{ lexicon.props['mls:hasCitationForm'][0].strval }}</td>
      <td>{{ lexicon.props.hasOwnProperty('mls:hasYear') ? lexicon.props['mls:hasYear'][0].strval : '?' }}</td>
    </tr>
  </table>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import {simplify_data} from '../lib/jsonld_simplifier';
import {lexicons_query} from '../lib/queries';

export default {
  name: 'lemmata',
  data: function() {
    return {
        lexicons: [],
    } 
  },
  methods: {
    getAll: function()  {
      axios({
        method: 'post',
        url: 'https://api.dasch.swiss/v2/searchextended',
        header: {'Content-Type': 'text/plain; charset=utf-8'},
        data: lexicons_query({})
      }).then(
        response => (this.lexicons = simplify_data(response.data))
      ).catch(function (error) {
        console.log(error);
      })
    },

    gotoLexicon: function(iri) {
      router.push({ path: '/lexicon/' + encodeURIComponent(iri)})
    }
  },
  mounted () {
    this.getAll();
  }
}
</script>
