const local = require("./localStrategy");
//To Do : KaKao Strategy 추가
const { getUserById } = require("../../models/modUser"); // 이부분 mod 가져와서 해야됨

module.exports = passport => {
    passport.serializeUser(function(user, done) {
        done(null, user.user_id); //확실 X
    });

    passport.deserializeUser(function(id, done) {
        getUserById(id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    //To Do : kakao(passport) 추가
};
