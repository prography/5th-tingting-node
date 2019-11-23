import Matching from "./entities/Team.entity";
const Op = Sequelize.Op;
//모델 수정 바람
class ModelMatching {
    //내 팀id가 send team id에 있다. user id != send member id
    async findMachingList(user_id,team_id) {
        return await Matching.findAll({
            attributes: [],
            where: {
                send_team_id: team_id,
                send_member_id: {
                    [Op.ne]: user_id
                  }
              }
        });
    }
};
module.exports = ModelMatching;