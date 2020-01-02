const MatchingService = require('../services/MatchingService')

const getMatchingList = async (req, res) => {
  const matchingService = new MatchingService()
  try {
    const matchingList = await matchingService.findMatchingList(1)//req.token.id
    if (matchingList.length === 0) {
      res.status(404).json({ errorMessage: '매칭 팀이 존재하지 않습니다.' })
    } else {
      res.status(200).json({
        data: { matchingList }
      })
    }
  } catch{
    console.log(error)
    res.status(500).json({ errorMessage: '팀 리스트 불러오기 실패' })
  }
}

module.exports = {
  getMatchingList
}
