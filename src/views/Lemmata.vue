<template> 
<div>
    <alphabetindex v-on:char_selected="startchar_changed"
                   v-bind:startchar="startchar"
                   v-bind:getData="getStartPage">
    </alphabetindex>
    <div>{{ nitems }} Einträge gefunden</div>
    <table>
        <tr><th>Lemma</th><th>Von</th><th>Bis</th></tr>
        <tr v-on:click="gotoLemma(lemma.iri)"
            v-for="lemma in lemmata"
            v-bind:key="lemma.iri">
            <td>{{ lemma.props['mls:hasLemmaText'][0].strval }}</td>
            <td>{{ lemma.props.hasOwnProperty('mls:hasStartDate') ? lemma.props['mls:hasStartDate'][0].strval : '?' }}</td>
            <td>{{ lemma.props.hasOwnProperty('mls:hasEndDate') ? lemma.props['mls:hasEndDate'][0].strval : '?' }}</td>
        </tr>
    </table>
    <v-pagination
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
import {lemmata_query} from '../lib/queries';
import alphabetindex from '../components/AlphabetindexComponent';

export default {
    name: 'lemmata',
    data: function() {
       return {
           startchar: 'A',
           page: 1,
           nitems: 0,
           pagesize: 25,
           lemmata: [],
        } 
    },
    computed: {
        npages: function() {
            return Math.ceil(this.nitems / this.pagesize);
        }
    },

    components: {
        alphabetindex
    },
    methods: {
        page_changed_to: function(pagenum) {
           this.page = pagenum;
           this.getPage(this.startchar, this.page - 1);

        },
        startchar_changed: function(val) {
            this.startchar = val;
        },
        getPage: function(ch, page)  {
            axios({
                method: 'post',
                url: 'https://api.dasch.swiss/v2/searchextended',
                header: {'Content-Type': 'text/plain; charset=utf-8'},
                data: lemmata_query({page: page, start: ch})
            }).then(
                response => (this.lemmata = simplify_data(response.data))
            ).catch(function (error) {
                console.log(error);
            })
        },

        getStartPage: function(ch, page = 0) {
            this.startchar = ch;
            axios({
                method: 'post',
                url: 'https://api.dasch.swiss/v2/searchextended/count',
                header: {'Content-Type': 'text/plain; charset=utf-8'},
                data: lemmata_query({page: 0, start: ch})
            }).then(
                response => (this.nitems = response.data['schema:numberOfItems'])
            ).catch(function (error) {
                console.log(error)
            });
            this.getPage(ch, page);
        },

        gotoLemma: function(iri) {
            router.push({ path: '/lemma/' + encodeURIComponent(iri)})
        }
    },
    mounted () {
        this.getStartPage(this.startchar, this.page - 1);
    }
}
</script>
