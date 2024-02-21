const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v6/exchangerate-api',
    createProxyMiddleware({
      target: 'https://v6.exchangerate-api.com',
      changeOrigin: true,
    })
  );
};