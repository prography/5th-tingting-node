const User = require("../models/entities/User.entity");

const getUserById = async id => {
    const user = await User.findOne({ where: { user_id: id } }).then(user => {
        return user.dataValues;
    });
    console.log("mod:", user);
    return user;
};

module.exports = {
    getUserById
};
