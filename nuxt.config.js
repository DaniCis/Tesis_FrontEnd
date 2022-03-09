export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Compunex',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' },
    ]
  },
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/css/soft-ui-dashboard.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

  ],
  server:{
    port: 3000,
    host:'10.147.17.71',
    timing: false
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  
  
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ["vue-toastification/nuxt", {
      timeout: 4000,
      draggable: false
    }]
  ],

  bootstrapVue: {
    icons: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          type: ''
        },
        endpoints: {
          login: { url: 'http://10.147.17.173:5001/login', method: 'post'},
          logout: false,
          user:false
        }
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
