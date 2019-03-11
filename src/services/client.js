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

export default {
  //auth
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
  },

  // all
  submitItem(contentType, item) {
    client
      .post(`/${contentType}`, item)
      .then(res => console.log(res.status))
      .catch(err => console.log(err))
  },
  updateItem(contentType, item) {
    client
      .put(`/${contentType}/${item._id}`, item)
      .then(res => console.log(res.status))
      .catch(err => console.log(err))
  },

  // apps
  async getApp(id) {
    return await client
      .post('/graphql', {
        query: `{
        app (id: "${id}") {
          title
          slug
          date
          categories
          tags
          image
          contributors
          description
          url
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })
  },
  async getAppList(publish) {
    return await client
      .post('/graphql', {
        query: `{
        apps (sort: "date:desc", where: { publish: ${publish} }) {
          _id
          title
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })
  },

  // articles
  async getArticle(id) {
    return await client
      .post('/graphql', {
        query: `{
        article (id: "${id}") {
          title
          slug
          date
          type
          categories
          tags
          splash
          summary
          images
          markdown
          authors {
            title
            slug
          }
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })
  },
  async getArticleList(publish) {
    return await client
      .post('/graphql', {
        query: `{
        articles (sort: "date:desc", where: { publish: ${publish} }) {
          _id
          title
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })
  },

  // authors
  async getAuthorList() {
    return await client
      .post('/graphql', {
        query: `{
        authors (sort: "title") {
          _id
          title
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })
  },

  // datsets
  async getDataset(id) {
    return await client
      .post('graphql', {
        query: `{
        dataset (id: "${id}") {
          title
          slug
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
          datacsv
          datafile {
            name
            url
          }
          apps (sort: "date:desc", where: { publish: false }) {
            title
            slug
          }
          articles (sort: "date:desc", where: { publish: false }) {
            title
            slug
          }
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })
  },
  async getDatasetList(publish) {
    return await client
      .post('graphql', {
        query: `{
        datasets (sort: "date:desc", where: { publish: ${publish} }) {
          _id
          title
        }
      }`
      })
      .catch(err => {
        console.log(err)
      })
  }
}
