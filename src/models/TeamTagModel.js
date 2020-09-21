const TeamTag = require('./entities/TeamTag.entity')
const Tag = require('./entities/Tag.entity')

TeamTag.belongsTo(Tag, { foreignKey: 'tag_id', as: 'tags' })

class TeamTagModel {
  async saveTeamTag (data) {
    await TeamTag.create({
      team_id: data.teamId,
      tag_id: data.tagId
    })
  }

  async findTeamTagsByTeamId (team_id) {
    const teamTags = await TeamTag.findAll({
      attributes: [],
      where: {
        team_id
      },
      include: [
        {
          model: Tag,
          as: 'tags',
          attributes: ['id', 'name']
        }
      ]
    })
    return teamTags
  }

  async deleteTeamTagsByTeamId (team_id) {
    await TeamTag.destroy({
      where: { team_id }
    })
  }
}

module.exports = TeamTagModel
