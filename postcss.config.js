module.exports = {
  plugins: [
    /* Add prefixes for the browsers I want to support (see browserList in package.json to view supported browsers) */
    require('autoprefixer'),

    /* Minifier */
    require('cssnano')({
      preset: ['default', {
        discardComments: {
          removeAll: true
        }
      }]
    })
  ]
}