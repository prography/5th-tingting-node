import AvailableEmail from './entities/AvailableEmail.entity'

class AvailableEmailModel {
<<<<<<< HEAD
<<<<<<< HEAD
  async findSchoolByDomain (domain) {
    const row = await AvailableEmail.findOne({
=======
  async findSchoolByDomain(domain) {
=======
  async findSchoolByDomain (domain) {
>>>>>>> Team Join
    const school = await AvailableEmail.findOne({
>>>>>>> me/team 저체 수정
      where: {
        domain
      },
      raw: true
    })
    return row
  }
}

module.exports = AvailableEmailModel
