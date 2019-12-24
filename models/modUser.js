import User from "./entities/User.entity";

class ModelUser{
    async findUserInfo(id) {

        //promise then
        const userData = await User.findAll({
            where:{
                id: id
            },
        });
        console.log("mod_user :", userData);
        return userData;
    }

    //프로필 수정
    async updateUserInfo(id, img){
        const userData = await User.update(
            {thumbnail: img},
            {where: id}
        ).then()
        return userData;
    }
}
module.exports = ModelUser;
