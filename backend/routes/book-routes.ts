import express = require("express");
import { check } from "express-validator";

import * as bookController from "../controllers/book-controllers";

const router = express.Router();


router.get("/user/:userId", bookController.getUserBooks);
router.get("/user/:userId/check", bookController.getUserBooksAndCheck);

router.get("/check/:bookId/:userId", bookController.checkBook);
// router.get("/info/:bookId/:userId", bookController.infoBook);

router.post(
    
    "/register/check",
    [
        // ユーザー認証機能を追加したらuserIdを追加。
        // モデルとずれているとエラーが発生する
        // ユーザー認証機能を作成したらONにする
        // check("userId").not().isEmpty(),
        check("bookId").not().isEmpty(),
        check("userId").not().isEmpty()    ],
    bookController.checkRegister
);

router.post(
    
    "/dnd/check",
    [],
        // ユーザー認証機能を追加したらuserIdを追加。
        // モデルとずれているとエラーが発生する
        // ユーザー認証機能を作成したらONにする
        // check("userId").not().isEmpty(),
    bookController.checkDnD
);

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
