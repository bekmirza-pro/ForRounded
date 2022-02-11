const { User, Admin } = require("../models/models");
const { sign } = require("../../lib/jwt");
const { comparePassword } = require("../../lib/bcrypt");

class LoginController {

    async login(req, res) {
        const { tell, username, password } = req.body;
        if (!password || (!tell && !username))
            return res.status(400).json({ message: "BAD_REQUEST!" });

        if (tell) {
            const user = await User.findOne({
                where: { tell },
            });

            if (!user) return res.status(400).json({ message: "BAD_REQUEST" });

            const comparedPassword = await comparePassword(
                password,
                user.dataValues.password
            );

            if (!comparedPassword)
                return res.status(400).json({ message: "BAD_REQUEST" });

            const token = sign({ userId: user.dataValues.id });
            return res.json({ user, token });
        } else {
            console.log("ok");

            const admin = await Admin.findOne({
                where: { username },
            });
            if (!admin) return res.status(400).json({ message: "BAD_REQUEST" });
            const comparedPassword = await comparePassword(
                password,
                admin.dataValues.password
            );

            if (!comparedPassword)
                return res.status(400).json({ message: "BAD_REQUEST" });

            if (admin.dataValues.role && admin.dataValues.role != "false") {
                const token = sign({ superId: admin.dataValues.id });

                return res.json({ admin, token });
            } else {
                const token = sign({ adminId: admin.dataValues.id });

                return res.json({ admin, token });
            }
        }
    }
}

module.exports = new LoginController();