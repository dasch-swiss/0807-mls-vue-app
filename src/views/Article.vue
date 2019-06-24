<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-card-title primary-title v-html="lexicon.citation"></v-card-title>
        <v-card-text v-html="article.text + '<br/>(Seite: ' + article.npages + ')'"></v-card-text>
      </v-card>
      <v-card>
        <v-card-title primary-title><h4>Links</h4></v-card-title>
        <v-card-text>
          <table>
            <tr v-if="article.fonoteca_code"><td>Fonoteca</td><td>:</td><td>{{ article.fonoteca_code }}</td></tr>
            <tr v-if="article.hls_code"><td>HLS</td><td>:</td><td>{{ article.hls_code }}</td></tr>
            <tr v-if="article.oeml_code"><td>OEML</td><td>:</td><td>{{ article.oeml_code }}</td></tr>
            <tr v-if="article.theaterlex_code"><td>Theaterlexikon</td><td>:</td><td>{{ article.theaterlex_code }}</td></tr>
            <tr v-if="article.ticinolex_code"><td>Ticino Lexikon</td><td>:</td><td>{{ article.ticinolex_code }}</td></tr>
            <tr><td>Weblink</td><td>:</td><td><a v-bind:href="article.weblink" target="_blank">{{ article.weblink }}</a></td></tr>
          </table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';
  import router from '../router';
  import {simplify_data} from '../lib/jsonld_simplifier';

  export default {
    name: "Article",
    data: function() {
      return {
        article: {},
        lexicon: {},
        server: this.$env.get('SERVER'),
        ontology: this.$env.get('ONTOLOGY')
      }
    },
    methods: {
      getArticle: function(iri) {
        axios({
          method: 'get',
          url: this.server + '/v2/resources/' + encodeURIComponent(iri),
        }).then(
          response => {
            let tmpdata = simplify_data(response.data)[0].props;
            this.article = {
              text: tmpdata.hasOwnProperty('mls:hasArticleText') ? tmpdata['mls:hasArticleText'][0].strval.replace(/\\n/g, "<br />") : '-',
              lexicon_iri: tmpdata['mls:hasALinkToLexiconValue'][0].iri,
              npages: tmpdata.hasOwnProperty('mls:hasPages') ? tmpdata['mls:hasPages'][0].strval : 'kein Text',
              fonoteca_code: tmpdata.hasOwnProperty('mls:hasFonotecacode') ? tmpdata['mls:hasFonotecacode'][0].strval : undefined,
              hls_code: tmpdata.hasOwnProperty('mls:hasHlsCcode') ? tmpdata['mls:hasHlsCcode'][0].strval : undefined,
              oeml_code: tmpdata.hasOwnProperty('mls:hasOemlCode') ? tmpdata['mls:hasOemlCode'][0].strval : undefined,
              theaterlex_code: tmpdata.hasOwnProperty('mls:hasTheaterLexCode') ? tmpdata['mls:hasTheaterLexCode'][0].strval : undefined,
              ticinolex_code: tmpdata.hasOwnProperty('mls:hasTicinoLexCode') ? tmpdata['mls:hasTicinoLexCode'][0].strval : undefined,
              weblink: tmpdata.hasOwnProperty('mls:hasWebLink') ? tmpdata['mls:hasWebLink'][0].strval : undefined
            };
            axios({
              method: 'get',
              url: this.server + '/v2/resources/' + encodeURIComponent(this.article.lexicon_iri)
            }).then(
              response => {
                let tmpdata = simplify_data(response.data)[0].props;
                this.lexicon = {
                  citation: '<h4>' + tmpdata['mls:hasCitationForm'][0].strval.replace(/\\n/g, "<br />") + '</h4>',
                  year: tmpdata['mls:hasYear'][0].strval
                }
              }
            ).catch(function(error) {
              console.log(error)
            })
          }
        ).catch(function (error) {
          console.log(error);
        })
      }
    },
    mounted () {
      this.getArticle(this.$route.params.iri);
    }
  }
</script>

<style scoped>

</style>
