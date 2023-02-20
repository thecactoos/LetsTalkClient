import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app) {
  // proxy api calls
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000/',
      changeOrigin: true,
    }),
  );
}
