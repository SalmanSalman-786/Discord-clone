const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const validateRegister = require("../middleware/validateRegister");
const authenticate = require("../middleware/authMiddleware");

router.post("/register", validateRegister, authController.register);

router.post("/login", authController.login);

router.get("/me",
    authenticate,
    authController.getCurrentUser
);

router.post("/refresh",
    authController.refresh
);

router.post("/logout",
    authenticate,
    authController.logout
);

module.exports = router;