const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

module.exports = {
    sign: (data) => jwt.sign(data, JWT_KEY, { expiresIn: 200 * 2 * 12 * 3600 }),
    verify: (data) => jwt.verify(data, JWT_KEY),
};