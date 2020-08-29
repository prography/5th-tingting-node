import ChatAddress from './entities/ChatAddress.entity'

class ChatAddressModel {
  async findChatAddress () {
    const chatAddress = await ChatAddress.findOne({
      order: [
        ['id', 'ASC']
      ],
      raw: true
    })
    return chatAddress
  }

  async deleteChatAddress (id) {
    await ChatAddress.destroy({
      where: { id }
    })
  }

  async savefindChatAddress (name, address, manager) {
    await ChatAddress.create({
      name,
      address,
      manager
    })
  }
}

module.exports = ChatAddressModel
