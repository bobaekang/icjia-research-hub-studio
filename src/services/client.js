import axios from 'axios'
import NProgress from 'nprogress'
import api from '@/config/api'

const client = axios.create({
  baseURL: api.BASE_URL
})

client.interceptors.request.use(config => {
  NProgress.start()
  return config
})

client.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export const auth = {
  login(user) {
    return new Promise((resolve, reject) => {
      client
        .post(api.AUTH_ROUTE, {
          identifier: user.identifier,
          password: user.password
        })
        .then(
          res => {
            const token = res.data.jwt
            client.defaults.headers.common['Authorization'] = `Bearer ${token}`
            resolve(res)
          },
          error => {
            reject(error)
          }
        )
    })
  },
  logout() {
    delete client.defaults.headers.common['Authorization']
  }
}

export const appGetters = {
  async getSingle(id) {
    const res = await client
      .post('/graphql', {
        query: `{
        app (id: "${id}") {
          title
          slug
          external
          date
          categories
          tags
          image
          contributors
          description
          url
          citation
          funding
          articles (sort: "date:desc", where: { status: "published" }) {
            _id
            title
            slug
          }
          datasets (sort: "date:desc", where: { status: "published" }) {
            _id
            title
            slug
          }
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })

    return {
      status: res.status,
      data: res.data ? res.data.data.app : null
    }
  },
  async getList(status) {
    const res = await client
      .post('/graphql', {
        query: `{
        apps (sort: "date:desc", where: { status: "${status}" }) {
          _id
          date
          title
          slug
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })

    return {
      status: res.status,
      data: res.data ? res.data.data.apps : null
    }
  }
}

export const articleGetters = {
  async getSingle(id) {
    const res = await client
      .post('/graphql', {
        query: `{
        article (id: "${id}") {
          title
          slug
          external
          date
          type
          categories
          tags
          splash
          thumbnail
          abstract
          images
          markdown
          citation
          doi
          funding
          apps (sort: "date:desc", where: { status: "published" }) {
            _id
            title
            slug
          }
          authors {
            _id
            title
            slug
          }
          datasets (sort: "date:desc", where: { status: "published" }) {
            _id
            title
            slug
          }
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })

    return {
      status: res.status,
      data: res.data ? res.data.data.article : null
    }
  },
  async getList(status) {
    const res = await client
      .post('/graphql', {
        query: `{
        articles (sort: "date:desc", where: { status: "${status}" }) {
          _id
          date
          title
          slug
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })

    return {
      status: res.status,
      data: res.data ? res.data.data.articles : null
    }
  }
}

export const authorGetters = {
  async getList() {
    const res = await client
      .post('/graphql', {
        query: `{
        authors (sort: "title") {
          _id
          title
          slug
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })

    return {
      status: res.status,
      data: res.data ? res.data.data.authors : null
    }
  }
}

export const datasetGetters = {
  async getData(id, csv) {
    const data = csv
      ? `
      datacsv
      datafilename
      `
      : `
      datafile {
        name
        url
      }`

    const res = await client
      .post('graphql', {
        query: `{
          dataset (id: "${id}" ) {
            ${data}
          }
        }`
      })
      .catch(err => {
        console.log(err)
      })

    return {
      status: res.status,
      data: res.data ? res.data.data.dataset : null
    }
  },
  async getSingle(id) {
    const res = await client
      .post('graphql', {
        query: `{
        dataset (id: "${id}") {
          title
          slug
          external
          date
          categories
          tags
          sources
          timeperiod
          agegroup
          unit
          variables
          description
          notes
          citation
          funding
          datacsv
          datafile {
            name
            url
          }
          apps (sort: "date:desc", where: { status: "published" }) {
            _id
            title
            slug
          }
          articles (sort: "date:desc", where: { status: "published" }) {
            _id
            title
            slug
          }
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })

    return {
      status: res.status,
      data: res.data ? res.data.data.dataset : null
    }
  },
  async getList(status) {
    const res = await client
      .post('graphql', {
        query: `{
        datasets (sort: "date:desc", where: { status: "${status}" }) {
          _id
          date
          title
          slug
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })

    return {
      status: res.status,
      data: res.data ? res.data.data.datasets : null
    }
  }
}

export const jobs = {
  async createItem(contentType, item) {
    item.status = item.status || 'created'

    return await client
      .post(`/${contentType}`, item)
      .catch(err => console.log(err))
  },
  async deleteItem(contentType, id) {
    return await client
      .delete(`/${contentType}/${id}`)
      .catch(err => console.log(err))
  },
  async updateItem(contentType, item, id) {
    return await client
      .put(`/${contentType}/${id}`, item)
      .catch(err => console.log(err))
  },
  async updateItemStatus(contentType, id, status) {
    const type = contentType.slice(0, contentType.length - 1)
    const updateType = `update${type[0].toUpperCase()}${type.slice(1)}`

    return await client
      .post('/graphql', {
        query: `mutation {
          ${updateType}(input: {
            where: {
              id: "${id}"
            },
            data: {
              status: "${status}"
            }
          }) {
            ${type} {
              status
            }
          }
        }`
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default client
