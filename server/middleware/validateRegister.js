const validator = require("validator");

const validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || username.trim().length < 3) {
        return res.status(400).json({
            success: false,
            message: "Username must be at least 3 characters long"
        });
    }

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email address"
        });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long"
        });
    }

    next();
};

module.exports = validateRegister;