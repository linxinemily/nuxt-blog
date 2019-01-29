const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'YeTa Blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'my nuxt-blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel:'stylesheet', href:"//fonts.googleapis.com/css?family=Inconsolata" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  loadingIndicator: {
    name: 'circle',
    color: '#eee'
  },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [,
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  env: {
    //environment variables
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-emily.firebaseio.com'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  // router: {
  //   middleware: 'log'
  // }
}
