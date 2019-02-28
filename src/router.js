import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        requiresAuth: true,
        userNotAllowed: false,
        managerNotAllowed: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('./views/Post.vue'),
      meta: {
        requiresAuth: true,
        userNotAllowed: true,
        managerNotAllowed: true
      }
    },
    {
      path: '/update',
      name: 'update',
      component: () => import('./views/Update.vue'),
      meta: {
        requiresAuth: true,
        userNotAllowed: true,
        managerNotAllowed: true
      }
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('./views/Manage.vue'),
      meta: {
        requiresAuth: true,
        userNotAllowed: true,
        managerNotAllowed: false
      }
    },
    {
      path: '/submit-new',
      name: 'submit',
      component: () => import('./views/SubmitNew.vue'),
      meta: {
        requiresAuth: true,
        userNotAllowed: false,
        managerNotAllowed: true
      }
    },
    {
      path: '/submit-update',
      name: 'submit',
      component: () => import('./views/SubmitUpdate.vue'),
      meta: {
        requiresAuth: true,
        userNotAllowed: false,
        managerNotAllowed: true
      }
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('./views/Result.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // let jwt = localStorage.getItem('jwt')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if (store.getters.role === 'ICJIA R&A User') {
        if (to.matched.some(record => record.meta.userNotAllowed)) {
          next('/')
        } else {
          next()
        }
      } else if (store.getters.role === 'ICJIA R&A Manager') {
        if (to.matched.some(record => record.meta.managerNotAllowed)) {
          next('/')
        } else {
          next()
        }
      } else if (store.getters.role === 'Administrator') {
        next()
      }
    } else {
      store.dispatch('logout')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
