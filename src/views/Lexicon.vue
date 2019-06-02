<template>
    <div>
        <table>
            <tr><td>Kürzel</td><td>:</td><td>{{lexicon.hasOwnProperty('mls:hasShortname') ? lexicon.props['mls:hasShortname'].strval : '?' }}</td></tr>
            <tr><td>Zitierform</td><td>:</td><td>{{ lexicon.props['mls:hasCitationForm'].strval }}</td></tr>
            <tr><td>Jahr</td><td>:</td><td>{{ lexicon.props['mls:hasYear'].strval }}</td></tr>
            <tr><td>Kommentar</td><td>:</td><td>{{ lexicon.props['mls:hasLexiconComment'].strval }}</td></tr>
            <tr><td>Link KVK</td><td>:</td><td>{{ lexicon.props['mls:hasLexiconWebLink'].strval }}</td></tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import {simplify_resource} from '../lib/jsonld_simplifier';

export default {
    name: 'lexicon',
    data: function() {
        return {
            lexicon: {}
        }
    },
    methods: {
        getLexiconData: function (iri) {
            axios({
                method: 'get',
                url: 'https://api.dasch.swiss/v2/resources/' + encodeURIComponent(iri),
                }).then(
                response => (this.lexicon = simplify_resource(response.data), console.log(this.lexicon))
            ).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted () {
        alert(this.$route.params.iri);
        this.getLexiconData(this.$route.params.iri);
    }
}
</script>
