/*
 * @Author: Echooooo-zhn haonanZHONG17@outlook.com
 * @Date: 2022-07-08 13:25:29
 * @LastEditors: Echooooo-zhn haonanZHONG17@outlook.com
 * @LastEditTime: 2022-07-08 20:14:58
 * @FilePath: \Visionaries\frontend\src\setupProxy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:6000',
      changeOrigin: true,
    })
  );
};