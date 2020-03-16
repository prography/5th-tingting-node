const dbLoader = require('./dbLoader.js')
const expressLoader = require('./expressLoader')
const configs = require('../configs')

const loaders = async app => {
  console.log('로더 실행')
  await dbLoader
    .authenticate()
    .then(() => {
      console.log('DB 연결 완료')
    })
    .catch(err => {
      console.error('DB 연결 실패: ', err)
    })
  if(configs.ENV === 'development'){
    await dbLoader.sync()
    console.log('DB sync 완료')
  }
  expressLoader(app)
  console.log('로더 완료')
}

module.exports = loaders
