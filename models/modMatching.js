import Matching from "./entities/Team.entity";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
//create를 먼저 해야함.........//향후 개발...
class ModelMatching {
    //내 팀id가 send team id에 있다. user id != send member id
    async findMatchingList(user_id,team_id) {
        const matchingList = [];
        await Matching.findAll({
            attributes: [team_id],
            where: {
                send_team_id: team_id,
                send_member_id: {
                    [Op.ne]: user_id
                  }
              }
        }).then(teams=>{
            teams.map(team=> matchingList.push(team.dataValues["team_id"]));
        });
        console.log("mod:", matchingList);
        return matchingList;
    }
};
module.exports = ModelMatching;