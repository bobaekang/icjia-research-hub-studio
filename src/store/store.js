import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    role: '',

    tasks: [
      {
        title: 'manage submissions',
        path: 'manage',
        permission: 'ICJIA R&A Manager'
      },
      {
        title: 'post new',
        path: 'post'
      },
      {
        title: 'submit new',
        path: 'submit-new',
        permission: 'ICJIA R&A User'
      },
      {
        title: 'submit update',
        path: 'submit-update',
        permission: 'ICJIA R&A User'
      },
      {
        title: 'update',
        path: 'update'
      }
    ],

    contentObj: {}
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
      state.role = ''
    },
    setRole(state, payload) {
      state.role = payload
    },

    setContentObj(state, payload) {
      state.contentObj = payload
    }
  },
  actions: {
    login({ commit }) {
      commit('login')
    },
    logout({ commit }) {
      commit('logout')
    },
    setRole({ commit }, role) {
      commit('setRole', role)
    },

    setContentObj({ commit }, item) {
      commit('setContentObj', item)
    }
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    role: state => state.role,
    tasks: state => state.tasks,

    contentObj: state => state.contentObj
  }
})
