const { getUserById } = require("../models/modUser");

const getUserInfo = async id => {
    try {
        const user = await getUserById(id).then();
        console.log("ser-user:", user);
        return user;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getUserInfo
};
