import {
  appGetters,
  articleGetters,
  authorGetters,
  datasetGetters,
  jobs
} from '@/services/client.js'

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

    switch (contentType) {
      case 'apps':
        res = await appGetters.getSingle(id)
        break
      case 'articles':
        res = await articleGetters.getSingle(id)
        break
      case 'datasets':
        res = await datasetGetters.getSingle(id)
        break
      default:
        break
    }

    commit('SET_ITEM', res.data)
    commit('SET_ITEM_ID', id)

    return res
  },
  async fetchItemList({ commit }, { contentType, status }) {
    let res

    switch (contentType) {
      case 'apps':
        res = await appGetters.getList(status)
        break
      case 'articles':
        res = await articleGetters.getList(status)
        break
      case 'authors':
        res = await authorGetters.getList()
        break
      case 'datasets':
        res = await datasetGetters.getList(status)
        break
      default:
        break
    }

    commit('SET_ITEM_LIST', res.data)
  },

  async updateItemToPublished({ commit }, { contentType, id }) {
    return await jobs.updateItemStatus(contentType, id, 'published')
  },
  async updateItemToSubmitted({ commit }, { contentType, id }) {
    return await jobs.updateItemStatus(contentType, id, 'submitted')
  },
  async updateItemToCreated({ commit }, { contentType, id }) {
    return await jobs.updateItemStatus(contentType, id, 'created')
  },

  async deleteItem({ commit }, { contentType, id }) {
    return await jobs.deleteItem(contentType, id)
  },
  async createItem({ commit, state, getters }, contentType) {
    await jobs.createItem(contentType, getters.itemToPost, state.item)
  },
  async updateItem({ commit, state, getters }, contentType) {
    return await jobs.updateItem(contentType, getters.itemToPost, state.itemId)
  }
}
