import AvailableEmail from './entities/AvailableEmail.entity'

class AvailableEmailModel {
  async findSchoolByDomain(domain) {
    const row = await AvailableEmail.findOne({
      where: {
        domain
      },
      raw: true
    })
    return row
  }
}

module.exports = AvailableEmailModel
