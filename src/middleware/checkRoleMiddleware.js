const { verify } = require("../../lib/jwt");

module.exports = {
    AUTH_SUPER_ADMIN: (req, res, next) => {
        try {
            const { token } = req.headers;
            const { superId } = verify(token);

            if (!superId)
                return res
                    .status(401)
                    .json({ message: "Login or Register!" });

            req.body.superId = superId;

            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "Login or Register!" });
        }
    },
    AUTH_ADMIN: (req, res, next) => {
        try {
            const { token } = req.headers;
            const { adminId } = verify(token);
            if (!adminId)
                return res
                    .status(401)
                    .json({ message: "Login or Register!" });

            req.body.adminId = adminId;

            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "Login or Register!" });
        }
    },
    AUTH_USER: (req, res, next) => {
        try {
            const { token } = req.headers;
            const { userId } = verify(token);

            if (!userId)
                return res
                    .status(401)
                    .json({ message: "Login or Register!" });

            req.body.userId = userId;

            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "Login or Register!" });
        }
    },
};