import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Projects from '../views/Projects'
import Lemmata from '../views/Lemmata'
import Lemma from '../views/Lemma'
import Lexicons from '../views/Lexicons'
import Lexicon from '../views/Lexicon'
import HelloWorldPage from '../views/HelloWorldPage'

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
    {
      path: '/lexicons',
      name: 'lexicons',
      component: Lexicons
    },
    {
      path: '/lexicon/:iri',
      name: 'lexicon',
      component: Lexicon
    },
    {
      path: '/helloworld',
      name: 'HelloWorldPage',
      component: HelloWorldPage
    }
  ]
})