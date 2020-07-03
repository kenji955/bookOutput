import express = require('express');
import { check } from "express-validator";

import * as bookController from "../controllers/book-controllers";

const router = express.Router();

router.get("/:bookId", bookController.getbook);

router.post(
    "/register",
    [
        check("id").not().isEmpty(),
        check("name").not().isEmpty(),
        check("author").not().isEmpty(),
    ],
    bookController.register
);

export default router;
