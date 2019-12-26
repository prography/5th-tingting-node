const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class AuthService {
    constructor() {}

    makeToken(userInfo) {
        const token = jwt.sign(
            {
                id: userInfo[0].dataValues.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 1000, //1시간
                issuer: "tingting"
            }
        );
        return token;
    }

    encryptPassword(password) {
        try {
            const buf = crypto.randomBytes(64);
            const key = crypto.pbkdf2Sync(password, buf, 100000, 64, "sha512");
            const encryptInfo = {
                salt: buf.toString("base64"),
                encryptedpassword: key.toString("base64")
            };
            return encryptInfo;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AuthService;
