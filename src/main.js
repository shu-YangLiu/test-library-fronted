// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueAxios, axios)
Vue.use(Qs)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
