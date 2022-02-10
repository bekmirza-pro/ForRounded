module.exports = function(role) {
    return function(req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const userRole = req.headers.role


            if (!userRole) {
                return res.status(401).json({ message: "Not authorized" })
            }
            if (userRole !== role) {
                return res.status(403).json({ message: "No access" })
            }
            req.user = userRole;
            next()
        } catch (e) {
            res.status(401).json({ message: "Not authorized" })
        }
    };

}