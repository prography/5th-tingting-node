import Apply from './entities/Apply.entity'

class ApplyModel {
  async deleteApplyByMatchingId (matching_id) {
    await Apply.destroy({
      where: { matching_id }
    })
  }

  async findMyApplys (userId) {
    const rows = await Apply.findAll({
      where: {
        sender_id: userId
      },
      raw: true
    })
    return rows
  }

  async findApplyByUserIdAndMatchingId (userId, matchingId) {
    const apply = await Apply.findOne({
      where: {
        sender_id: userId,
        matching_id: matchingId
      },
      raw: true
    })
    return apply
  }

  async saveApply (userId, matchingId) {
    await Apply.create({
      sender_id: userId,
      matching_id: matchingId
    })
  }

  async findApplysByMatchingId (matchingId) {
    const rows = await Apply.findAll({
      where: {
        matching_id: matchingId
      },
      raw: true
    })
    return rows
  }

  async deleteApplysByMatchingId (matchingId) {
    await Apply.destroy(
      {
        where: {
          matching_id: matchingId
        },
       }
    )
  }
}

module.exports = ApplyModel
