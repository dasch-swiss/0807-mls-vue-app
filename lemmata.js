Vue.component('lemmata', {
    data: function() {
        return {
            page: 0,
            start: 'a',
            lemmata: [{props: {"mls:hasLemmaText": {strval: 'gaga'}}}]
        }
    },
    methods: {
        sortit: function(element) {
            this.lemmata = this.lemmata.sort(function (a, b) {
                return a[element].localeCompare(b[element]);
            })
        },
        prev: function() {
            this.page--;
            axios({
                method: 'post',
                url: 'https://api.dasch.swiss/v2/searchextended',
                header: {'Content-Type': 'text/plain; charset=utf-8'},
                data: lemmata_query({page: this.page, start: this.start})
            }).then(
                response => (this.lemmata = simplify(response.data), console.log(this.lemmata))
            ).catch(function (error) {
                console.log(error);
            })

        },
        next: function() {
            this.page++;
            axios({
                method: 'post',
                url: 'https://api.dasch.swiss/v2/searchextended',
                header: {'Content-Type': 'text/plain; charset=utf-8'},
                data: lemmata_query({page: this.page, start: this.start})
            }).then(
                response => (this.lemmata = simplify(response.data), console.log(this.lemmata))
            ).catch(function (error) {
                console.log(error);
            })
        },
        setStart: function(ch) {
            this.start = ch;
            axios({
                method: 'post',
                url: 'https://api.dasch.swiss/v2/searchextended',
                header: {'Content-Type': 'text/plain; charset=utf-8'},
                data: lemmata_query({page: this.page, start: this.start})
            }).then(
                response => (this.lemmata = simplify(response.data), console.log(this.lemmata))
            ).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted: function() {
        axios({
            method: 'post',
            url: 'https://api.dasch.swiss/v2/searchextended',
            header: {'Content-Type': 'text/plain; charset=utf-8'},
            data: lemmata_query({page: this.page, start: this.start})
        }).then(
            response => (this.lemmata = simplify(response.data), console.log(this.lemmata))
        ).catch(function (error) {
            console.log(error);
        })
    },
    template: `
    <div>
    <span v-on:click="setStart('A')">A</span>
    <span v-on:click="setStart('B')">B</span>
    <span v-on:click="setStart('C')">C</span>
    <span v-on:click="setStart('D')">D</span>
    <span v-on:click="setStart('E')">E</span>
    <span v-on:click="setStart('G')">G</span>
    <span v-on:click="setStart('H')">H</span>
    <span v-on:click="setStart('I')">I</span>
    <span v-on:click="setStart('J')">J</span>
    <span v-on:click="setStart('K')">K</span>
    <span v-on:click="setStart('L')">L</span>
    <span v-on:click="setStart('M')">M</span>
    <span v-on:click="setStart('N')">N</span>
    <span v-on:click="setStart('O')">O</span>
    <span v-on:click="setStart('P')">P</span>
    <span v-on:click="setStart('Q')">Q</span>
    <span v-on:click="setStart('R')">R</span>
    <span v-on:click="setStart('S')">S</span>
    <span v-on:click="setStart('T')">T</span>
    <span v-on:click="setStart('U')">U</span>
    <span v-on:click="setStart('V')">V</span>
    <span v-on:click="setStart('W')">W</span>
    <span v-on:click="setStart('X')">X</span>
    <span v-on:click="setStart('Y')">Y</span>
    <span v-on:click="setStart('Z')">Z</span>
    <table>
        <tr><th v-on:click="sortit('gaga')">Lemma</th><th>Von</th><th>Bis</th></tr>
        <tr
            v-for="lemma in lemmata"
            v-bind:key="lemma.iri">
            <td>{{ lemma.props['mls:hasLemmaText'].strval }}</td>
            <td>{{ lemma.props.hasOwnProperty('mls:hasStartDate') ? lemma.props['mls:hasStartDate'].strval : '?' }}</td>
            <td>{{ lemma.props.hasOwnProperty('mls:hasEndDate') ? lemma.props['mls:hasEndDate'].strval : '?' }}</td>
        </tr>
    </table>
    <span v-on:click="prev()">prev</span> <span v-on:click="next()">next</span></div>
    `
})