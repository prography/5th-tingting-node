import Tag from './entities/Tag.entity'

class TagModel {

  async getAllTags(){
    const tags = await Tag.findAll({
      attributes:['id','name'],
      raw: true
    })
    return tags
  }
}

module.exports = TagModel