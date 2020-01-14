import Apply from './entities/Apply.entity'

class ApplyModel {
  async deleteApplyByMatchingId (matching_id) {
    await Apply.destroy({
      where: { matching_id }
    })
  }
}
module.exports = ApplyModel
