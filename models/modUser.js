import User from "./entities/User.entity";

class ModelUser{
    async findUserInfo(id) {
        const userData = await User.findAll({
            where:{
                user_id: id
            },
        }).then(users=>{
            return users;
        });
        console.log("mod_user :", userData);
        return userData;
    }
    async updateUserInfo(id, img){
        const userData = await User.update(
            {thumbnail: img},
            {where: id}
        ).then()
        return userData;
    }
}
module.exports = ModelUser;
