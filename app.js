
const Lemmata = {
    template: '<lemmata></lemmata>'
}

const Lexika = {
    template: '<div>Lexika</div>'
}

const Lemma = {
    template: '<lemma></lemma>'
}

const NotFound = {
    template: '<div>!!! NOT FOUND !!!</div>'
}

/*
const routes = {
    '/': Lemmata,
    '/lexika': Lexika,
    '/lemma': Lemma
}



var app = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent () {
            return routes[this.currentRoute] || NotFound
        }
    },
    render (h) { return h(this.ViewComponent) }
})
*/

const routes = [
    { path: '/lemma/:iri', component: Lemma },
    { path: '/lemmata', component: Lemmata }
]

const router = new VueRouter({
    routes: routes // short for `routes: routes`
})

const app = new Vue({
    el: '#app',
    router: router
}).$mount('#app')
