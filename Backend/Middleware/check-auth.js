const jet = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "this_must_be_a_long_string");
    } catch (error) {
        res.status(401).json({ message: "Auth failed" });
    }

};