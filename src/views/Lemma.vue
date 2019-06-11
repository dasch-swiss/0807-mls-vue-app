<template>
    <v-card>
        <v-card-title primary-title>
            <h3 class="headline mb-0">Lemma</h3>
        </v-card-title>
        <v-card-text>
            <table>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasFamilyName')">
                    <td>Nachname</td><td>:</td><td>{{ lemma.props['mls:hasFamilyName'][0].strval }}</td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasGivenName')">
                    <td>Vorname</td><td>:</td><td><div>{{ lemma.props['mls:hasGivenName'][0].strval }}</div></td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasLemmaText')">
                    <td>Lemma</td><td>:</td><td>{{ lemma.props['mls:hasLemmaText'][0].strval }}</td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasLemmaType')">
                    <td>Typ</td><td>:</td><td>{{ lemma.props['mls:hasLemmaType'][0].strval }}</td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasSex')">
                    <td>Geschlecht</td><td>:</td><td>{{ lemma.props['mls:hasSex'][0].strval }}</td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasStartDate')">
                    <td>Von</td><td>:</td><td>{{ lemma.props['mls:hasStartDate'][0].strval }}</td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasEndDate')">
                        <td>Bis</td><td>:</td><td>{{ lemma.props['mls:hasEndDate'][0].strval }}</td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasLemmaDescription')">
                    <td>Beschreibung</td><td>:</td><td>{{ lemma.props['mls:hasLemmaDescription'][0].strval }}</td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasPseudonym')">
                    <td>Pseudonym(e)</td><td>:</td><td><div v-for="tmp in lemma.props['mls:hasPseudonym']">{{ tmp.strval }}</div></td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasVariants')">
                    <td>Variante(n)</td><td>:</td><td><div v-for="tmp in lemma.props['mls:hasVariants']">{{ tmp.strval }}</div></td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasViaf')">
                    <td>VIAF</td><td>:</td><td>{{ lemma.props['mls:hasViaf'][0].strval }}</td>
                </tr>
                <tr v-if="lemma.props.hasOwnProperty('mls:hasGnd')">
                    <td>GND</td><td>:</td><td>{{ lemma.props['mls:hasGnd'][0].strval }}</td>
                </tr>
            </table>
            <div>Erscheint in:</div>
            <lexfromlemma v-bind:lemmairi="this.$route.params.iri"
                          v-bind:lexiconiri="this.$route.query.lexicon">
            </lexfromlemma>
         </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';
import {simplify_resource} from '../lib/jsonld_simplifier';
import lexfromlemma from './LexFromLemma';

export default {
    name: 'lemma',
    components: {
        lexfromlemma
    },
    data: function() {
        return {
            lemma: {
                props: {}
            },
            lexicon_iri: undefined,
            lexicon: {
                props: {gaga: 'gaga'}
            }
        }
    },
    methods: {
        getResourceData: function (iri) {
            axios({
                method: 'get',
                url: 'https://api.dasch.swiss/v2/resources/' + encodeURIComponent(iri),
                }).then(
                response => (this.lemma = simplify_resource(response.data))
            ).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted () {
        this.getResourceData(this.$route.params.iri, 'lemma');
    }
}
</script>
