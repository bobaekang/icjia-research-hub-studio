export const namespaced = true

export const state = {
  isLoggedIn: false,
  role: '',
  jwt: ''
}

export const mutations = {
  LOGIN(state) {
    state.isLoggedIn = true
  },
  LOGOUT(state) {
    state.isLoggedIn = false
    state.role = ''
  },
  SET_ROLE(state, payload) {
    state.role = payload
  }
}

export const actions = {
  login({ commit }) {
    commit('LOGIN')
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  setRole({ commit }, role) {
    commit('SET_ROLE', role)
  }
}
