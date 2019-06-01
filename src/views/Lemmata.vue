 <template> 
    <div>
    <button v-for="c in alphabet" v-on:click="getStartPage(c)">{{ c }}</button>
    <div>Found {{ nitems }} items</div>
    <table>
        <tr><th>Lemma</th><th>Von</th><th>Bis</th></tr>
        <tr v-on:click="gotoLemma(lemma.iri)"
            v-for="lemma in lemmata"
            v-bind:key="lemma.iri">
            <td>{{ lemma.props['mls:hasLemmaText'].strval }}</td>
            <td>{{ lemma.props.hasOwnProperty('mls:hasStartDate') ? lemma.props['mls:hasStartDate'].strval : '?' }}</td>
            <td>{{ lemma.props.hasOwnProperty('mls:hasEndDate') ? lemma.props['mls:hasEndDate'].strval : '?' }}</td>
        </tr>
    </table>
    
    <paging
        v-bind:nitems="nitems"
        v-bind:pagesize="25"
        v-bind:ch="startch"
        v-bind:select_page="getPage"></paging>
    </div>
</template>

<script>
import axios from 'axios';
import router from '@/router'
import {simplify} from '../lib/gravsearch_simplifier'
import {lemmata_query} from '../lib/queries'

export default {
    name: 'lemmata',
    data: function() {
       return {
            alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            nitems: 0,
            pagesize: 25,
            startch: 'a',
            lemmata: [],
        } 
    },
    methods: {
        getPage: function(ch, page)  {
            axios({
                method: 'post',
                url: 'https://api.dasch.swiss/v2/searchextended',
                header: {'Content-Type': 'text/plain; charset=utf-8'},
                data: lemmata_query({page: page, start: ch})
            }).then(
                response => (this.lemmata = simplify(response.data))
            ).catch(function (error) {
                console.log(error);
            })
        },

        getStartPage: function(ch) {
            this.startch = ch;
            this.nitems = 5;
            axios({
                method: 'post',
                url: 'https://api.dasch.swiss/v2/searchextended/count',
                header: {'Content-Type': 'text/plain; charset=utf-8'},
                data: lemmata_query({page: 0, start: ch})
            }).then(
                response => (this.nitems = response.data['schema:numberOfItems'])
            ).catch(function (error) {
                console.log(error)
            })
            this.getPage(ch, 0);
        },

        gotoLemma: function(iri) {
            router.push({ path: '/lemma/' + encodeURIComponent(iri)})
        }
    },
    mounted () {
        this.getStartPage('A', 0);
    }
}
</script>
