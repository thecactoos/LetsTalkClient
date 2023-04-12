const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  // proxy api calls
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      changeOrigin: true,
    }),
  );
};
