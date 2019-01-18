import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('./views/Post.vue')
    },
    {
      path: '/update',
      name: 'update',
      component: () => import('./views/Update.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('./views/Manage.vue')
    },
    {
        path: '/submit',
        name: 'submit',
        component: () => import('./views/Submit.vue')
    },
    {
        path: '/result',
        name: 'result',
        component: () => import('./views/Result.vue')
    },
  ]
})
