const { getUserInfo } = require("../services/serUser");

const getUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = await getUserInfo(id).then();
    console.log("cont-user:", user);
    res.send(user);
};

module.exports = {
    getUser
};
