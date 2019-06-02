<template>
    <div>
        <table>
            <tr><td>Nachname</td><td>:</td><td>{{ lemma.props['mls:hasFamilyName'].strval }}</td></tr>
            <tr><td>Vorname</td><td>:</td><td>{{ lemma.props['mls:hasGivenName'].strval }}</td></tr>
            <tr><td>Lemma</td><td>:</td><td>{{ lemma.props['mls:hasLemmaText'].strval }}</td></tr>
            <tr><td>Typ</td><td>:</td><td>{{ lemma.props['mls:hasLemmaType'].strval }}</td></tr>
            <tr><td>Geschlecht</td><td>:</td><td>{{ lemma.props['mls:hasSex'].strval }}</td></tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import {simplify_resource} from '../lib/jsonld_simplifier';

export default {
    name: 'lemma',
    data: function() {
        return {
            lemma: {}
        }
    },
    methods: {
        getLemmaData: function (iri) {
            axios({
                method: 'get',
                url: 'https://api.dasch.swiss/v2/resources/' + encodeURIComponent(iri),
                }).then(
                response => (this.lemma = simplify_resource(response.data), console.log(this.lemma))
            ).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted () {
        // alert(this.$route.params.iri);
        this.getLemmaData(this.$route.params.iri);
    }
}
</script>
