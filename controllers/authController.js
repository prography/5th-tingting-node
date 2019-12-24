const UserService = require("../services/serUser");

const getRegister = (req, res) => {
    res.send("registration");
};

const getLogin = (req, res) => {
    res.send("login");
};

const signup = async (req, res, next) => {
    const userService = new UserService();
    const {
        id,
        password,
        username,
        birth,
        height,
        thumbnail,
        authenticated_address,
        gender
    } = req.body; //To Do : 썸네일, 인증이메일 수정 필요
    try {
        const exUser = await userService.findUserInfo(id);
        if (exUser == []) {
            console.log("이미 가입된 사람입니다.");
            return res.redirect("/auth/registration");
        } else {
            await userService.saveUser({
                id,
                password,
                username,
                birth,
                height,
                thumbnail,
                authenticated_address,
                gender
            });
            res.send("Saved account!");
        }
    } catch (error) {
        console.log(error);
    }
};

const postLogin = (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!authError) {
        }
    });
};

const postLogout = (req, res) => {
    req.logout();
    res.redirect("/");
};

module.exports = {
    getRegister,
    getLogin,
    signup,
    postLogin,
    postLogout
};
