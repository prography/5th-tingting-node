const SerTeam = require('../services/serTeam')

// 팀 생성
const createTeam = async (req, res, next) => {
  const serTeam = new SerTeam()
  const {
    name,
    chat_address,
    owner_id,
    intro,
    gender,
    password,
    max_member_number
  } = req.body
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
const updateMyTeam = async(req,res)=>{
  const serTeam = new SerTeam()
  const id = 5
  const {
    name,
    chat_address,
    owner_id,
    intro,
    password,
    max_member_number
  }= req.body
  try{
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
  }catch(error){
    console.log(error)
  }
}

module.exports = {
  createTeam,
  updateMyTeam
}
