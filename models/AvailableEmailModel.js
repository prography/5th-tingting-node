import AvailableEmail from './entities/AvailableEmail.entity'

class AvailableEmailModel {
  async findSchoolByDomain (domain) {
    const school = await AvailableEmail.findOne({
      where: {
        domain
      }
    })
    return school
  }
}

module.exports = AvailableEmailModel
