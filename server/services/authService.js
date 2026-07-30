const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require("../utils/jwt");



const registerUser = async ({ username, email, password }) => {
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
        throw new Error("Username already exists");
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    return {
        accessToken,
        refreshToken,
        user
    };
};

const refreshAccessToken = async (refreshToken) => {

    if (!refreshToken) {
        throw new Error("Refresh token required");
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.id);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
    }

    const accessToken = generateAccessToken(user);

    return accessToken;
};

const logoutUser = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.refreshToken = null;

    await user.save();
};

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
};