const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../../models/entities/User.entity"); //mod껄로 바꿔야됨

module.exports = passport => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "id",
                passwordField: "password",
                session: true,
                passReqToCallback: false
            },
            async (id, password, done) => {
                try {
                    const exUser = await User.findOne({ where: { id } });
                    if (exUser) {
                        const result = await bcrypt.compare(
                            password,
                            exUser.password
                        );
                        if (result) {
                            return done(null, exUser);
                        } else {
                            return done(null, false, {
                                message: "비밀번호가 틀렸습니다."
                            });
                        }
                    } else {
                        return done(null, false, {
                            message: "해당 ID 가 존재하지 않습니다."
                        });
                    }
                } catch (error) {
                    console.log(error);
                    return done(error);
                }
            }
        )
    );
};
