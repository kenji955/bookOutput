import express = require("express");
import { check } from "express-validator";

import * as bookController from "../controllers/book-controllers";

const router = express.Router();

router.get("/:bookId", bookController.getbook);

router.post(
    "/register",
    [
        // ユーザー認証機能を追加したらuserIdを追加。
        // モデルとずれているとエラーが発生する
        // ユーザー認証機能を作成したらONにする
        // check("userId").not().isEmpty(),
        check("bookId").not().isEmpty(),
        check("name").not().isEmpty(),
        check("author").not().isEmpty(),
    ],
    bookController.register
);

export default router;
