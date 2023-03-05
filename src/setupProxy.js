const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  // proxy api calls
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://chatark.herokuapp.com/api',
      changeOrigin: true,
    }),
  );
};
