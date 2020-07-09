import express = require("express");
import { check } from "express-validator";

import * as userController from "../controllers/user-controllers";

const router = express.Router();

// router.get("/:bookId", userController.getbook);

router.post(
    "/login",
    [
        check("name").not().isEmpty(),
        check("password").not().isEmpty()
    ],
    userController.login
);
router.post(
    "/signup",
    [
        check("name").not().isEmpty(),
        check("email").not().isEmpty(),
        check("password").not().isEmpty()
    ],
    userController.signup
);

export default router;
