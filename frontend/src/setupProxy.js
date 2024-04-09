// setupProxy.js

import {createProxyMiddleware } from 'http-proxy-middleware'

module.exports = function(app) {
  app.use(
    '/api', // Your API endpoint to be proxied
    createProxyMiddleware({
      target: 'http://localhost:8080', // Your API backend URL
      changeOrigin: true,
    })
  );
};
