import Tag from './entities/Tag.entity'

class TagModel {

  async findTagIdByTagName (name) {
    const tag = await Tag.findOne({
        where:{
            name
        },
        raw: true
    })
    return tag
  }

  async getAllTagList(){
    const tags = await Tag.findAll({
      attributes:['name'],
      raw: true
    })
    const tagList = tags.map(tag => tag.name)
    return tagList
  }
}

module.exports = TagModel