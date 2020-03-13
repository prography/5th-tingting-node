import TeamTag from './entities/TeamTag.entity'
import Tag from './entities/Tag.entity'

TeamTag.belongsTo(Tag,{foreignKey:'tag_id', as: 'tag'})

class TeamTagModel {

  async saveTeamTag (data) {
    await TeamTag.create({
        team_id:data.teamId,
        tag_id:data.tagId
    })
  }

  async findTeamTagByTeamId(team_id){
      const teamTag = await TeamTag.findAll({
        attributes: [],
          where:{
              team_id
          },
          include:[
              {
                  model : Tag,
                  as: 'tag',
                  attributes : ['id','name']
              }
          ]
      })
      return teamTag
  }

  async deleteTeamTag(team_id){
    await TeamTag.destroy({
      where:{team_id}
    })
  }
  
}

module.exports = TeamTagModel
