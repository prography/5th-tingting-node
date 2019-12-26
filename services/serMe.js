const ModelUser = require("../models/modUser");


class serMe {
    constructor() {
        this.modUser = new ModelUser();
    }

    async findMyInfo(userId) {
        try {
            const myInfo = await this.modUser.findUserInfo(userId);
            return myInfo;
        } catch (error) {
            console.log(error);
        }
    };

    async updateMyInfo(data) {
        try {
            await this.modUser.updateUserInfo(data);
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports = serMe;