import Accept from './entities/Accept.entity'

class AcceptModel {
  async deleteAcceptByMatchingId (matching_id) {
    await Accept.destroy({
      where: { matching_id }
    })
  }
}
module.exports = AcceptModel
