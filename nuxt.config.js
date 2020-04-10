
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Agri gestion',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'PWA for agri gestion software' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    'ribs-popup/dist/css/style.min.css',
    'ribs-flash-message/dist/css/style.css',
  ],

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/icon',
    '@nuxtjs/manifest'
  ],

  manifest: {
    name: 'Agri gestion',
    short_name: "A-gestion",
    description: "Gérez vos parcelles, quand vous y mettez vos vaches, quand vous les sortez, etc.",
    start_url: '/login',
    display: "standalone",
    orientation: 'portrait-primary',
    theme_color: '#007bff',
    lang: 'fr'
  },

  build: {
    extend (config, ctx) {
    }
  }
}
