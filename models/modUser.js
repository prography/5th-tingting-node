import User from "./entities/User.entity";

class ModelUser{
    // async findUserInfo(user_id) {
    //     await User.findAll({
    //         where:{
    //             user_id: this.user_id
    //         },
    //     }).then(users=>{
    //         return users.dataValues;
    //     });
    //     console.log("mod_user :", users);
    //     return users;
    // }
}
module.exports = ModelUser;
