export const namespaced = true

export const state = {
  item: {},
  types: ['apps', 'articles', 'authors', 'datasets']
}

export const mutations = {
  SET_ITEM(state, payload) {
    state.item = payload
  }
}

export const actions = {
  setItem({ commit }, item) {
    commit('SET_ITEM', item)
  }
}
