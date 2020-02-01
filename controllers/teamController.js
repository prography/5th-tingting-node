const TeamService = require('../services/TeamService')

// 전체 팀 리스트
const getTeamList = async (req, res) => {
  try {
    // 팀ID 리스트 생성
    const userId = req.token.id
    const teamService = new TeamService()
    const teamList = await teamService.findAllTeamListWithoutMe(userId)
    if (teamList.length === 0) {
      const errorMessage = '팀이 존재하지 않습니다.'
      console.log({ errorMessage })
      res.status(404).json({ errorMessage })
    } else {
      const data = { teamList }
      console.log(data)
      res.status(200).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

// 팀 생성
const createTeam = async (req, res) => {
  const teamService = new TeamService()
  const userId = req.token.id
  const {
    body: { name, chat_address, intro, place, password, max_member_number }
  } = req
  try {
    await teamService.saveTeam({
      name,
      chat_address,
      owner_id: userId,
      intro,
      place,
      password,
      max_member_number
    })
    const data = { message: '팀 생성 성공' }
    console.log(data)
    res.status(201).json({ data }) // 생성된 팀 정보(name) name으로 id 찾아서 정보 반환 --> 기능 찾아서 추가
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

// 팀명 중복 확인
const checkDuplicateTeamName = async (req, res) => {
  const teamService = new TeamService()
  const {
    query: { name }
  } = req
  const isDuplicated = await teamService.checkIsDuplicatedTeamName(name)
  if (isDuplicated) {
    const errorMessage = '이미 존재하는 팀명입니다.'
    console.log({ errorMessage })
    res.status(401).json({ errorMessage })
  } else {
    const data = { message: '사용 가능한 팀명입니다.' }
    console.log(data)
    res.status(200).json({ data })
  }
}

// 개별 팀 정보 보기
const getTeamInfo = async (req, res) => {
  const teamService = new TeamService()
  try {
    const teamId = req.params.id
    const teamInfo = await teamService.getTeamInfo(teamId)
    if (teamInfo === null) {
      const errorMessage = '팀이 존재하지 않습니다.'
      console.log({ errorMessage })
      res.status(404).json({ errorMessage })
    } else {
      const teamMembers = await teamService.getTeamMembersInfo(
        teamId,
        teamInfo.owner_id
      )
      const data = {
        teamInfo,
        teamMembers
      }
      console.log(data)
      res.status(200).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

const joinTeam = async (req, res) => {
  const teamService = new TeamService()
  const teamId = parseInt(req.params.id)
  const userId = req.token.id
  const {
    body: { password }
  } = req
  try {
    const teamList = await teamService.findAllTeamListWithoutMe(userId)
    if (teamList.length !== 0) {
      let isTeamPossibleToJoin = false
      teamList.some(team => {
        if (team.id === teamId) {
          isTeamPossibleToJoin = true
        }
      })
      if (isTeamPossibleToJoin) {
        const teamPassword = await teamService.getTeamPassword(teamId)
        if (teamPassword !== null) {
          // 비밀번호가 있는 경우
          if (teamPassword === password) {
            await teamService.joinTeamToBelong(teamId, userId)
            const data = { message: '합류에 성공했습니다.' }
            console.log(data)
            res.status(201).json({ data })
          } else {
            const errorMessage = '비밀번호가 틀렸습니다.'
            console.log({ errorMessage })
            res.status(403).json({ errorMessage })
          }
        } else {
          // 비밀번호가 없는 경우
          await teamService.joinTeamToBelong(teamId, userId)
          const data = { message: '합류에 성공했습니다.' }
          console.log(data)
          res.status(201).json({ data })
        }
      } else {
        const errorMessage = '합류가 불가능한 팀입니다.'
        console.log({ errorMessage })
        res.status(403).json({ errorMessage })
      }
    } else {
      const errorMessage = '합류할 수 있는 팀이 존재하지 않습니다.'
      console.log({ errorMessage })
      res.status(404).json({ errorMessage })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ errorMessage: '서버 에러' })
  }
}

module.exports = {
  getTeamList,
  createTeam,
  checkDuplicateTeamName,
  getTeamInfo,
  joinTeam
}
