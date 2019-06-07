<template>
  <v-layout>
    <v-flex xs12 sm8 offset-sm2>
  <v-card>
    <v-card-title primary-title v-html="lexicon.citation"></v-card-title>
    <v-card-text v-html="article.text"></v-card-text>
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
        lexicon: {}
      }
    },
    methods: {
      getArticle: function(iri) {
        axios({
          method: 'get',
          url: 'https://api.dasch.swiss/v2/resources/' + encodeURIComponent(iri),
        }).then(
          response => {
            let tmpdata = simplify_data(response.data)[0].props;
            this.article = {
              text: tmpdata.hasOwnProperty('mls:hasArticleText') ? tmpdata['mls:hasArticleText'][0].strval.replace(/\\n/g, "<br />") : '-',
              lexicon_iri: tmpdata['mls:hasALinkToLexiconValue'][0].iri,
              npages: tmpdata.hasOwnProperty('mls:hasPages') ? tmpdata['mls:hasPages'][0].strval : 'kein Text'
            };
            console.log(tmpdata);
            axios({
              method: 'get',
              url: 'https://api.dasch.swiss/v2/resources/' + encodeURIComponent(this.article.lexicon_iri)
            }).then(
              response => {
                let tmpdata = simplify_data(response.data)[0].props;
                this.lexicon = {
                  citation: tmpdata['mls:hasCitationForm'][0].strval.replace(/\\n/g, "<br />"),
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