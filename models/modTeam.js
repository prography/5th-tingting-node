import Team from "./entities/Team.entity";

class ModelTeam {
    async findTeamList_ByTeam(user_id) {
        const teamList = [];
        await Team.findAll({
            attributes: ['team_id'],
            where: {
                owner_id: user_id
              },
        }).then(teams=>{
            teams.map(team=> teamList.push(team.dataValues["team_id"]));
            //count까지 추가하면 나중에 팀리스트에서 내가 팀장인 팀 나타낼 수 있을 듯
        });
        console.log("mod:", teamList);
        return teamList;
    }
}
module.exports = ModelTeam;
