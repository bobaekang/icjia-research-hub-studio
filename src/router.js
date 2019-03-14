import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'

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
      path: '/post-new',
      name: 'post-new',
      component: () => import('./views/Post.vue'),
      meta: {
        requiresAuth: true,
        userNotAllowed: true,
        managerNotAllowed: true
      }
    },
    {
      path: '/post-update',
      name: 'post-update',
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
      name: 'submit-update',
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
    },
    {
      path: '*',
      component: () => import('@/views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // let jwt = localStorage.getItem('jwt')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.auth.isLoggedIn) {
      if (store.state.auth.role === 'R&A User') {
        if (to.matched.some(record => record.meta.userNotAllowed)) {
          next('/')
        } else {
          next()
        }
      } else if (store.state.auth.role === 'R&A Manager') {
        if (to.matched.some(record => record.meta.managerNotAllowed)) {
          next('/')
        } else {
          next()
        }
      } else if (store.state.auth.role === 'Administrator') {
        next()
      }
    } else {
      store.dispatch('auth/logout')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
