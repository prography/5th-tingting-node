import Belong from "./entities/Belong.entity";

class ModelBelong {
    async findTeamList_ByBelong(user_id) {
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
