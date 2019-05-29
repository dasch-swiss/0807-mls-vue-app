
var app = new Vue({
    el: '#app',
    data () {
        return {
            gaga: null
        }
    },
    mounted () {
        axios
            .get('https://api.dasch.swiss/v1/projects')
            .then(response => (this.gaga = response.data.projects))
    }
})