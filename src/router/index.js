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
      path: '/AutoPaper',
      name: 'register',
      component: () => import('@/view/register')
    },
    // AutoPaper
    {
      path: '/AutoPaper',
      name: 'AutoPaper',
      component: () => import('@/view/AutoPaper')
    },
    {
      path: '/ManualPaper',
      name: 'ManualPaper',
      component: () => import('@/view/ManualPaper')
    },
    {
      path: '/Enter',
      name: 'Enter',
      component: () => import('@/view/form/Enter')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/view/home')
    }
  ]
})
