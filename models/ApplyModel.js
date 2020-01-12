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
}
module.exports = ApplyModel
