import AvailableEmail from './entities/AvailableEmail.entity'

class AvailableEmailModel {
  async findSchoolByDomain (domain) {
    const row = await AvailableEmail.findOne({
      where: {
        domain
      }
    })
    return row
  }
}

module.exports = AvailableEmailModel
