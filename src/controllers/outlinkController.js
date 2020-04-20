const useragent = require('express-useragent')

const redirectToStoreUrl = async (req, res) => {
  try {
    const userAgent = useragent.parse(req.headers['user-agent'])
    if (userAgent.isAndroid || userAgent.isiPhone) {
      const storeUrl = (userAgent.isAndroid) ? 'https://play.google.com/store/apps/details?id=com.tingting.ver01' : 'https://apps.apple.com/us/app/%ED%8C%85%ED%8C%85-%EB%8C%80%ED%95%99%EC%83%9D%EC%9D%84-%EC%9C%84%ED%95%9C-%EA%B2%80%EC%A6%9D%EB%90%9C-%EB%AF%B8%ED%8C%85-%EC%95%B1/id1493700519'
      res.redirect(storeUrl)
    } else {
      res.redirect('https://api.tingting.kr')
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

module.exports = {
  redirectToStoreUrl
}
