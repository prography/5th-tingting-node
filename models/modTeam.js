import Team from "./entities/Team.entity";

class ModelTeam {
    //팀 생성
    async createTeam(team_id, teamname, chat_address, gender, owner_id,team_member_number,intro,verified_at){
        await Team.create({
            team_id : team_id,
            teamname : teamname,
            chat_address: chat_address,
            gender: gender,
            owner_id: owner_id,
            team_member_number : team_member_number,
            intro: intro,
            verified_at : verified_at,
        })
    }

    //팀 수정

    //인원에 따른 팀 리스트 찾기

    //나의 팀 리스트 찾기
    async findMyTeamList(user_id) {
        const teamList = [];
        await Team.findAll({
            attributes: ['team_id'],
            where: {
                owner_id: user_id
              },
        }).then(teams=>{
            teams.map(team=> teamList.push(team.dataValues["team_id"]));
        });
        console.log("mod:", teamList);
        return teamList;
    }


}
module.exports = ModelTeam;
