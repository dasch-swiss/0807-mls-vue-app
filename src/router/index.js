import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Projects from '@/views/Projects.vue'
import Lemmata from '@/views/Lemmata.vue'
import Lemma from '@/views/Lemma.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/lemmata',
      name: 'lemmata',
      component: Lemmata
    },
    {
      path: '/lemma/:iri',
      name: 'lemma',
      component: Lemma
    },
    
  ]
})
