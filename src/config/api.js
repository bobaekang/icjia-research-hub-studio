const env = process.env
let api

api = {
  BASE_URL: env.VUE_APP_API_BASE_URL,
  AUTH_ROUTE: '/auth/local'
}

// if (env.NODE_ENV === 'development') {
//   api = {
//     BASE_URL: env.VUE_APP_API_BASE_URL,
//     AUTH_ROUTE: '/auth/local'
//   }
// } else if (env.NODE_ENV === 'production') {
//   const fs = require('fs')
//   const getSecretVal = secret => {
//     return fs.readFileSync(`/run/secrets/${secret}`, 'utf8').trim()
//   }

//   api = {
//     BASE_URL: getSecretVal(env.API_BASE_URL),
//     AUTH_ROUTE: '/auth/local'
//   }
// }

export default api
