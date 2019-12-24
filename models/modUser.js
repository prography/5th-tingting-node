import User from "./entities/User.entity";

class ModelUser {
    async saveUser(data) {
        await User.create({
            id: data.id,
            password: data.password,
            username: data.username,
            birth: data.birth,
            height: data.height,
            thumbnail: data.thumbnail,
            authenticated_address: data.authenticated_address,
            gender: data.gender
        });
    }
    async findUserInfo(id) {

        //promise then
        const userData = await User.findAll({
            where: {
                id
            }
        });
        console.log("mod_user :", userData);
        return userData;
    }
    async updateUserInfo(id, img) {
        const userData = await User.update(
            { thumbnail: img },
            { where: id }
        ).then();
        return userData;
    }
}
module.exports = ModelUser;
