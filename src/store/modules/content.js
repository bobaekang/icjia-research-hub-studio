import client from '@/services/client.js'

export const namespaced = true

export const state = {
  item: {},
  itemId: '',
  itemlist: [],
  types: ['apps', 'articles', 'datasets'],
  allTypes: ['apps', 'authors', 'articles', 'datasets']
}

export const mutations = {
  SET_ITEM(state, payload) {
    state.item = payload
  },
  SET_ITEM_ID(state, payload) {
    state.itemId = payload
  },
  FETCH_ITEM_LIST(state, payload) {
    state.itemlist = payload
  }
}

export const actions = {
  setItem({ commit }, item) {
    commit('SET_ITEM', item)
  },
  setItemId({ commit }, id) {
    commit('SET_ITEM_ID', id)
  },

  async fetchItem({ commit }, { contentType, id }) {
    let res
    let item

    if (contentType === 'apps') {
      res = await client.getApp(id)
      item = res.data.data.app
    } else if (contentType === 'articles') {
      res = await client.getArticle(id)
      item = res.data.data.article
    } else if (contentType === 'datasets') {
      res = await client.getDataset(id)
      item = res.data.data.dataset
    }

    commit('SET_ITEM', item)
    commit('SET_ITEM_ID', id)

    return res
  },
  async fetchItemList({ commit }, { contentType, publish }) {
    let res
    let itemlist

    if (contentType === 'apps') {
      res = await client.getAppList(publish)
      itemlist = res.data.data.apps
    } else if (contentType === 'authors') {
      res = await client.getAuthorList()
      itemlist = res.data.data.authors
    } else if (contentType === 'articles') {
      res = await client.getArticleList(publish)
      itemlist = res.data.data.articles
    } else if (contentType === 'datasets') {
      res = await client.getDatasetList(publish)
      itemlist = res.data.data.datasets
    }

    commit('FETCH_ITEM_LIST', itemlist)
  },

  async publishItem({ commit }, { contentType, id }) {
    return await client.updateItemPublishStatus(contentType, id, true)
  },
  async unpublishItem({ commit }, { contentType, id }) {
    return await client.updateItemPublishStatus(contentType, id, false)
  }
}
