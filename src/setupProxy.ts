import { Application } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

module.exports = function (app: Application) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:3002/',
      // target: 'http://81.68.248.232:3002/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  );
};
