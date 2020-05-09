const express = require('express')
const loaders = require('./loaders')
const { socketBuilder } = require('./utils/sockets')
const app = express();

(async function startApp (app) {
  await loaders(app)
  const server = app.listen(app.get('port'), () => {
    console.log('서버 작동 중')
  })
  socketBuilder(server)
})(app)
