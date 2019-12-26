const dbLoader = require('./dbLoader.js')
const expressLoader = require('./expressLoader')

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
  expressLoader(app)
  console.log('로더 완료')
}

module.exports = loaders
