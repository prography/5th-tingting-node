import AvailableEmail from './entities/AvailableEmail.entity'

class ModelAvailableEmail {
  async findSchoolByDomain(domain) {
    const school = await AvailableEmail.findOne({
      where: {
        domain
      }
    })
    return school
  }
}

module.exports = ModelAvailableEmail
