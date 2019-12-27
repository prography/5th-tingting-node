const SerTeam = require('../services/serTeam')
//전체 팀 리스트
const getTeamList = async (req,res)=>{
  const serTeam = new SerTeam()
  const TeamList = await serTeam.findAllTeamListWithoutMe(1)//token
  res.json({TeamList})
}


// 팀 생성
const createTeam = async (req, res, next) => {
  const serTeam = new SerTeam()
  const {
    body: {
      name,
      chat_address,
      owner_id,
      intro,
      gender,
      password,
      max_member_number
    }
  } = req
  try {
    await serTeam.saveTeam({
      name,
      chat_address,
      owner_id,
      intro,
      gender,
      password,
      max_member_number
    })
    res.status(201).json('팀 만들기 성공')
  } catch (error) {
    console.log(error)
  }
}

// 팀 수정
const updateMyTeam = async (req, res) => {
  const serTeam = new SerTeam()
  const id = 5
  const {
    body: {
      name,
      chat_address,
      owner_id,
      intro,
      password,
      max_member_number
    }
  } = req
  try {
    await serTeam.updateMyTeam({
      id,
      name,
      chat_address,
      owner_id,
      intro,
      password,
      max_member_number
    })
    res.status(202).json('팀 수정 성공')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getTeamList,
  createTeam,
  updateMyTeam
}
