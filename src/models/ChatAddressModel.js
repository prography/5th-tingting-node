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
}

module.exports = ChatAddressModel
