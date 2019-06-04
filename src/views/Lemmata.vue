<template>
    <div>
        <!--
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
        -->
        <v-card-title>
            Lemmata
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Suche"
                    single-line
                    v-on:change="gaga"
                    hide-details></v-text-field>
        </v-card-title>
        <alphabetindex v-on:char_selected="startchar_changed"
                       v-bind:startchar="startchar"
                       v-bind:getData="getStartPage">
        </alphabetindex>
        <div class="text-xs-center">
        {{ nitems }} Einträge gefunden
        </div>

        <v-data-table
                :headers="headers"
                :items="lemmata"
                :total-items="nitems"
                hide-actions
                :loading="loading"
                class="elevation-1">
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:items="props">
                <td v-on:click="gotoLemma(props.item.iri)">{{ props.item.lemma }} ({{ props.item.from }} - {{ props.item.to }})</td>
            </template>
        </v-data-table>
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
                rpp: [25],
                lemmata: [],
                loading: false,
                headers: [
                    {text: "Lemma", value: "lemma", sortable: false},
                ],
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
            gaga: function(val) {
                console.log(val);
            },
            page_changed_to: function(pagenum) {
                this.page = pagenum;
                this.getPage(this.startchar, this.page - 1);
            },
            startchar_changed: function(val) {
                this.startchar = val;
            },
            getPage: function(ch, page)  {
                this.loading = true;
                axios({
                    method: 'post',
                    url: 'https://api.dasch.swiss/v2/searchextended',
                    header: {'Content-Type': 'text/plain; charset=utf-8'},
                    data: lemmata_query({page: page, start: ch})
                }).then(
                        response => {this.lemmata = simplify_data(response.data).map(x => ({
                            iri: x.iri,
                            lemma: x.props['mls:hasLemmaText'][0].strval,
                            from: x.props.hasOwnProperty('mls:hasStartDate') ? x.props['mls:hasStartDate'][0].strval : '?',
                            to: x.props.hasOwnProperty('mls:hasEndDate') ? x.props['mls:hasEndDate'][0].strval : '?'
                        })); this.loading = false; }
                ).catch(function (error) {
                    console.log(error);
                })
            },
            getStartPage: function(ch, page = 0) {
                this.startchar = ch;
                this.page = page + 1;
                this.loading = true;
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

<style>
    table.v-table tbody td, table.v-table tbody th {
        height: 24px;
    }
</style>