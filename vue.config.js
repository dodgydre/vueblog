module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vueblog/'
    : '/',
    runtimeCompiler: true,
}
