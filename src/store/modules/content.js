import client from '@/services/client.js'

export const namespaced = true

export const state = {
  item: {},
  itemlist: [],
  types: ['apps', 'articles', 'datasets'],
  allTypes: ['apps', 'authors', 'articles', 'datasets']
}

export const mutations = {
  SET_ITEM(state, payload) {
    state.item = payload
  },
  FETCH_ITEM_LIST(state, payload) {
    state.itemlist = payload
  }
}

export const actions = {
  setItem({ commit }, item) {
    commit('SET_ITEM', item)
  },
  async fetchItemList({ commit }, { contentType, publish }) {
    let res
    let itemlist

    if (contentType === 'apps') {
      res = await client.getAppList(publish)
      itemlist = res.data.data.apps
    } else if (contentType === 'authors') {
      res = await client.getAuthorsList()
      itemlist = res.data.data.authors
    } else if (contentType === 'articles') {
      res = await client.getArticleList(publish)
      itemlist = res.data.data.articles
    } else if (contentType === 'datasets') {
      res = await client.getDatasetList(publish)
      itemlist = res.data.data.datasets
    }

    commit('FETCH_ITEM_LIST', itemlist)
  }
}
