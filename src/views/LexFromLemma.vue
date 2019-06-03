<template>
    <ul>
        <li v-for="lexlemma in lexlemmas"
            v-bind:title="lexlemma.article_iri"
            v-html="lexlemma.citationform"></li>
    </ul>
</template>

<script>
    import axios from 'axios';
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
                    //response => (console.log(response.data), this.knoradata = simplify_resource(response.data))
                    response => {
                        let data;
                        if (response.data.hasOwnProperty('@graph')) {
                            data = simplify_data(response.data);
                        }
                        else {
                            data = [simplify_resource(response.data)];
                        }
                        console.log(data)
                        this.lexlemmas = [];
                        data.forEach(lexres => {
                            let lexlemma = {};
                            lexlemma.citationform = lexres.props['mls:hasCitationForm'][0].strval.replace("\\n", "<br />");
                            lexlemma.articletext = lexres.incoming.props['mls:hasArticleText'][0].strval;
                            lexlemma.article_iri = lexres.incoming.iri;
                            this.lexlemmas.push(lexlemma);
                        });
                    }
                ).catch(function (error) {
                    console.log(error);
                })

            }
        },
        mounted () {
            this.getLexs(this.lemmairi);
        }

    }
</script>

<style scoped>

</style>