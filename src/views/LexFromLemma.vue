<template>
    <v-data-table
            :headers="headers"
            :items="lexlemmas"
            hide-actions
            hide-headers
            class="elevation-1">
        <template v-slot:items="props">
            <td v-on:click="gotoArticle(props.item.article_iri)" v-html="props.item.citationform"></td>
        </template>
    </v-data-table>
</template>

<script>
    import axios from 'axios';
    import router from '../router';
    import {simplify_resource, simplify_data} from '../lib/jsonld_simplifier';
    import {lexlemma_query} from '../lib/queries';

    export default {
        name: "lexfromlemma",
        data: function() {
            return {
                lexlemmas: [{
                    citationform: '-',
                    articletext: '-',
                    article_iri: '-'
                }],
                headers: [
                    {text: "Lexica", value: "lexlemma", sortable: false},
                ]
            }
        },
        props: {
            lemmairi: String
        },
        methods: {
            getLexs: function(lemma_iri) {
                axios({
                    method: 'post',
                    url: 'https://api.dasch.swiss/v2/searchextended',
                    header: {'Content-Type': 'text/plain; charset=utf-8'},
                    data: lexlemma_query({lemma_iri: lemma_iri})
                }).then(
                    response => {
                        let tmpdata = simplify_data(response.data);
                        this.lexlemmas = [];
                        tmpdata.forEach(lexres => {
                            let lexlemma = {};
                            lexlemma.citationform = lexres.props.hasOwnProperty('mls:hasCitationForm') ? lexres.props['mls:hasCitationForm'][0].strval.replace(/\\n/g, "<br />") : '-';
                            lexlemma.articletext = lexres.incoming.props.hasOwnProperty('mls:hasArticleText') ? lexres.incoming.props['mls:hasArticleText'][0].strval : '-';
                            lexlemma.article_iri = lexres.incoming.iri;
                            this.lexlemmas.push(lexlemma);
                        });
                    }
                ).catch(function (error) {
                    alert(error);
                })
            },
            gotoArticle: function(iri) {
                //router.replace({name: 'lemmata', query: {alpha: this.startchar, page: this.page}});
                router.push({ path: '/article/' + encodeURIComponent(iri)})
            },

        },
        mounted () {
            this.getLexs(this.lemmairi);
        }

    }
</script>

<style scoped>

</style>