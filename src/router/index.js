import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/view/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/view/register')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/view/home')
    }
  ]
})
