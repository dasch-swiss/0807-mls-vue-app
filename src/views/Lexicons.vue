<template>
  <div>
    <h3>Lexika</h3>
    <div class="text-xs-center">
      {{ nitems }} Einträge gefunden
    </div>
    <v-data-table
            :headers="headers"
            :items="lexicons"
            :total-items="nitems"
            hide-actions
            :loading="loading"
            class="elevation-1">
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <td v-on:click="gotoLexicon(props.item.iri)">{{ props.item.citationForm }}</td>
        <td v-on:click="gotoLexicon(props.item.iri)">{{ props.item.year }}</td>
        <td v-on:click="gotoLexicon(props.item.iri)">{{ props.item.webLink }}</td>
      </template>
    </v-data-table>
    <v-pagination
            v-if="npages > 1"
            v-model="page"
            :length="npages"
            value="page"
            v-on:input="page_changed_to">
    </v-pagination>
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
      loading: false,
      nitems: 0,
      pagesize: 25,
      headers: [
        {text: "Citationform", value: "citationForm", sortable: false},
        {text: "Jahr", value: "year", sortable: false},
        {text: "Weblink", value: "webLink", sortable: false},
      ],
      lexicons: [],
      server: this.$env.get('SERVER'),
      ontology: this.$env.get('ONTOLOGY')
    }
  },
  computed: {
    npages: function() {
      return Math.ceil(this.nitems / this.pagesize);
    }
  },

  methods: {
    getAll: function(page = 0)  {
      axios({
        method: 'post',
        url: this.server + '/v2/searchextended/count',
        header: {'Content-Type': 'text/plain; charset=utf-8'},
        data: lexicons_query({page: page, ontology: this.ontology})
      }).then(
        response => (this.nitems = response.data['schema:numberOfItems'])
      ).catch(function (error) {
        console.log(error);
      });

      axios({
        method: 'post',
        url: this.server +'/v2/searchextended',
        header: {'Content-Type': 'text/plain; charset=utf-8'},
        data: lexicons_query({page: page, ontology: this.ontology})
      }).then(
        response => {
          this.lexicons = simplify_data(response.data).map(x => ({
            iri: x.iri,
            citationForm: x.props.hasOwnProperty('mls:hasCitationForm') ? x.props['mls:hasCitationForm'][0].strval : '-',
            year: x.props.hasOwnProperty('mls:hasYear') ? x.props['mls:hasYear'][0].strval : '-',
            webLink: x.props.hasOwnProperty('mls:hasLexiconWeblink') ? x.props['mls:hasLexiconWeblink'][0].strval : '-'
          })), console.log(this.lexicons)
        }
      ).catch(function (error) {
        console.log(error);
      })
    },

    page_changed_to: function(pagenum) {
      this.page = pagenum;
      this.getAll(this.page - 1);
    },

    gotoLexicon: function(iri) {
      //router.push({ path: '/lexicon/' + encodeURIComponent(iri)})
      router.push({ path: 'lemmata', query: { lexicon: iri }})
    }
  },
  mounted () {
    this.getAll();
  }
}
</script>

<style>
  table.v-table tbody td, table.v-table tbody th {
    height: 24px;
  }
</style>