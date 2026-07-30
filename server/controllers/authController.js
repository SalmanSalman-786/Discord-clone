const authService = require("../services/authService");

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
                user: {
                    id: result.user._id,
                    username: result.user.username,
                    email: result.user.email,
                    role: result.user.role
                }
            }
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

const getCurrentUser = async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
};

const refresh = async (req, res) => {
    try {

        const { refreshToken } = req.body;

        const accessToken =
            await authService.refreshAccessToken(refreshToken);

        res.status(200).json({
            success: true,
            data: {
                accessToken
            }
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};

const logout = async (req, res) => {

    try {

        await authService.logoutUser(req.user._id);

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    register,
    login,
    getCurrentUser,
    refresh,
    logout
};