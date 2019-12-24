import Belong from "./entities/Belong.entity";

class ModelBelong {
    //나의 개별 팀 리스트 찾기
    async findMyTeamList(user_id) {
        const teamList = [];
        await Belong.findAll({
            attributes: ['team_id'],
            where: {
                user_id: user_id
            },
        }).then(belongs=>{
            belongs.map(belong=> teamList.push(belong.dataValues["team_id"]));
        });
        return teamList;
    }
}
module.exports = ModelBelong;
