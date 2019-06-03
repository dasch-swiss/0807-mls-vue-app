import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from '@/router'

Vue.config.productionTip = false

// Start support for ENV vars
let CONFIG = !!window.CONFIG ? window.CONFIG : process.env
function getConfig(k, dfl) {
    if (CONFIG[k]) {
        return CONFIG[k]
    } else if (CONFIG['VUE_APP_'+k]) {
        return CONFIG['VUE_APP_'+k]
    } else {
        return dfl
    }
}
// End support for ENV vars

const envPlugin = {
  install(Vue, options) {
      Vue.prototype.$env = {
          get: function (k, dfl) {
              return getConfig(k, dfl)
          }
      }
  }
}

Vue.use(envPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
