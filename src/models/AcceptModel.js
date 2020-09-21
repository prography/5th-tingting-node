const Accept = require('./entities/Accept.entity')

class AcceptModel {
  async deleteAcceptByMatchingId (matching_id) {
    await Accept.destroy({
      where: { matching_id }
    })
  }

  async findAcceptByUserIdAndMatchingId (userId, matchingId) {
    const accept = await Accept.findOne({
      where: {
        accepter_id: userId,
        matching_id: matchingId
      },
      raw: true
    })
    return accept
  }

  async saveAccept (userId, matchingId) {
    await Accept.create({
      accepter_id: userId,
      matching_id: matchingId
    })
  }

  async findAcceptsByMatchingId (matchingId) {
    const rows = await Accept.findAll({
      where: {
        matching_id: matchingId
      },
      raw: true
    })
    return rows
  }

  async deleteAcceptsByMatchingId (matchingId) {
    await Accept.destroy(
      {
        where: {
          matching_id: matchingId
        }
      }
    )
  }
}

module.exports = AcceptModel
