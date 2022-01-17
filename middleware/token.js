const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    req.forbidden = true;

    if (!authHeader) {
        req.isAuth = false;
        return res.status(401).json({ status: 0, msg: "User not authorized" });
    }
    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return res.status(401).json({ status: 0, msg: "User not authorized" });
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
        req.isAuth = false;
        return res.status(401).json({ status: 0, msg: "User not authorized" });
    }
    if (!decodedToken) {
        req.isAuth = false;
        return res.status(401).json({ status: 0, msg: "User not authorized" });
    }

    req.isAuth = true;
    req.id = decodedToken.id;
    req.token = token;
    if (req.isAuth) {
        next();
    } else {
        return res.status(401).json({ status: 0, msg: "User not authorized" });
    }
};
