import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Projects from '../views/Projects'
import Lemmata from '../views/Lemmata'
import Lemma from '../views/Lemma'
import Lexicons from '../views/Lexicons'
import Article from '../views/Article'
import HelloWorldPage from '../views/HelloWorldPage'
import StartPage from '../views/StartPage'
import InfoPage from '../views/InfoPage'

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
      path: '/article/:iri',
      name: 'article',
      component: Article
    },
    {
      path: '/start',
      name: 'Start',
      component: StartPage
    },
    {
      path: '/info',
      name: 'InfoPage',
      component: InfoPage
    }

  ]
})
