const ModelUser = require("../models/modUser");

class serMe {
    constructor() {
        this.modUser = new ModelUser();
    }

    async findMyInfo(userId) {
        try {
            const myInfo = await this.modUser.findUserInfoById(userId);
            return myInfo;
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = serMe;
