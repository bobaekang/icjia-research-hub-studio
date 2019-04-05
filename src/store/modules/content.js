import client from '@/services/client.js'

export const namespaced = true

export const state = {
  item: {},
  itemId: '',
  itemlist: [],
  types: ['apps', 'articles', 'datasets'],
  typesAll: ['apps', 'authors', 'articles', 'datasets']
}

export const getters = {
  itemToPost: state => {
    let item = state.item

    if (item.apps) item.apps = item.apps.map(el => el._id)
    if (item.articles) item.articles = item.articles.map(el => el._id)
    if (item.authors) item.authors = item.authors.map(el => el._id)
    if (item.datasets) item.datasets = item.datasets.map(el => el._id)

    return item
  }
}

export const mutations = {
  SET_ITEM(state, payload) {
    state.item = payload
  },
  SET_ITEM_ID(state, payload) {
    state.itemId = payload
  },
  SET_ITEM_LIST(state, payload) {
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
  clearAll({ commit }) {
    commit('SET_ITEM', {})
    commit('SET_ITEM_ID', '')
    commit('SET_ITEM_LIST', [])
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
  async fetchItemList({ commit }, { contentType, status }) {
    let res
    let itemlist

    if (contentType === 'apps') {
      res = await client.getAppList(status)
      itemlist = res.data.data.apps
    } else if (contentType === 'authors') {
      res = await client.getAuthorList()
      itemlist = res.data.data.authors
    } else if (contentType === 'articles') {
      res = await client.getArticleList(status)
      itemlist = res.data.data.articles
    } else if (contentType === 'datasets') {
      res = await client.getDatasetList(status)
      itemlist = res.data.data.datasets
    }

    commit('SET_ITEM_LIST', itemlist)
  },

  async updateItemToPublished({ commit }, { contentType, id }) {
    return await client.updateItemStatus(contentType, id, 'published')
  },
  async updateItemToSubmitted({ commit }, { contentType, id }) {
    return await client.updateItemStatus(contentType, id, 'submitted')
  },
  async updateItemToCreated({ commit }, { contentType, id }) {
    return await client.updateItemStatus(contentType, id, 'created')
  },

  async deleteItem({ commit }, { contentType, id }) {
    return await client.deleteItem(contentType, id)
  },
  async createItem({ commit, state, getters }, contentType) {
    return await client.createItem(contentType, getters.itemToPost, state.item)
  },
  async updateItem({ commit, state, getters }, contentType) {
    return await client.updateItem(
      contentType,
      getters.itemToPost,
      state.itemId
    )
  }
}
