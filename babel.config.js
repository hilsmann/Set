module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/Set/'
  : '/',
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
