import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import Book from "../models/book";
import CheckList from "../models/checkList";
import checkList from "../models/checkList";

export const getUserBooks = async (req, res, next) => {
    let books;
    const userId = req.params.userId;
    // const { userId } = req.body;
    // console.log("userIdのチェック：" + userId);

    try {
        books = await Book.find({ userId: userId })
            .lean()
            .exec((error, result) => {
                // console.log("books:" + result);
                res.json({ books: result });
            });
    } catch (err) {
        const error = new HttpError(
            "本の取得に失敗しました。お手数ですが、後ほどもう一度お試しください。",
            500
        );
        return next(error);
    }
    // res.json({ books: books.map((book) => book.toObject({ getters: true })) });
    // console.log("books：" + books.id);
    // res.json({ books: books});
};

// チェックリスト取得処理
export const checkBook = async (req, res, next) => {
    let books;
    const bookId = req.params.bookId;
    const userId = req.params.userId;
    // console.log("bookIDのチェック：" + req.params.bookId);
    // console.log("userIdのチェック：" + userId);

    let bookInfoResult, bookCheck;
    // ひとまずの表示ができた処理
    // try {
    //     books = await Book.findOne({ bookId: bookId, userId: userId })
    //         .lean()
    //         .exec((error, result) => {
    //             console.log("books:" + result);
    //             bookInfoResult = result;
    //             res.json({ books: bookInfoResult });
    //         });
    // } catch (err) {
    //     const error = new HttpError(
    //         "本の取得に失敗しました。お手数ですが、後ほどもう一度お試しください。",
    //         500
    //     );
    //     return next(error);
    // }

    // try {
    //     books = await Book.findOne({ bookId: bookId, userId: userId })
    //         .lean()
    //         .exec((error, result) => {
    //             console.log("books:" + result);
    //             bookInfoResult = result;
    //             res.json({ books: bookInfoResult });
    //         });
    // } catch (err) {
    //     const error = new HttpError(
    //         "本の取得に失敗しました。お手数ですが、後ほどもう一度お試しください。",
    //         500
    //     );
    //     return next(error);
    // }
    try {
        bookInfoResult = await Book.findOne({ bookId: bookId, userId: userId });
        bookCheck = await CheckList.find({ bookId: bookId, userId: userId });
    } catch (err) {
        const error = new HttpError(
            "本の取得に失敗しました。お手数ですが、後ほどもう一度お試しください。",
            500
        );
        return next(error);
    }

    res.json({
        books: bookInfoResult.toObject({ getters: true }),
        checkList: bookCheck,
        // checkList: bookCheck.toObject({ getters: true }),
    });
    // console.log("books：" + bookInfoResult[0].bookId);
    // res.json({ books: bookInfoResult });
    // res.json({ books: bookInfoResult.map((book) => book.toObject({ getters: true })) });
    // res.json({ books: books});
};

export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError(
                "無効な入力が行われました。入力内容を確認してください。" +
                    errors[0] +
                    errors[1],
                422
            )
        );
    }
    const {
        userId,
        bookId,
        name,
        author,
        image,
        publishedDate,
        description,
    } = req.body;
    // const { userId, bookId, name, author } = req.body;
    // ユーザー認証機能を追加したらuserIdを追加。
    // モデルとずれているとエラーが発生する

    let existingBook;
    try {
        existingBook = await Book.findOne({ id: bookId, userId: userId });
    } catch (err) {
        const error = new HttpError(
            "本の登録に失敗しました。入力内容を確認してください。",
            500
        );
        return next(error);
    }

    if (existingBook) {
        const error = new HttpError(
            "User exists already, please login instead.",
            422
        );
        return next(error);
    }

    // ユーザー認証機能を追加したらuserIdを追加。
    // モデルとずれているとエラーが発生する
    const createdBook = new Book({
        userId,
        bookId,
        name,
        author,
        image,
        publishedDate,
        description,
    });
    // console.log(createdBook);

    // ユーザー認証機能を追加したらuserIdを追加。
    // モデルとずれているとエラーが発生する
    try {
        await createdBook.save();
    } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try again later.",
            500
        );
        return next(error);
    }

    res.status(201).json({ user: createdBook.toObject({ getters: true }) });
};

// チェックリスト登録処理
export const checkRegister = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError(
                "無効な入力が行われました。入力内容を確認してください。" +
                    errors[0] +
                    errors[1],
                422
            )
        );
    }
    const {
        userId,
        bookId,
        checkListId: { id, value, order, checkFrag },
    } = req.body;
    // const { userId, bookId, name, author } = req.body;
    // ユーザー認証機能を追加したらuserIdを追加。
    // モデルとずれているとエラーが発生する

    // ユーザー認証機能を追加したらuserIdを追加。
    // モデルとずれているとエラーが発生する
    const createdCheckList = new CheckList({
        userId,
        bookId,
        checkListId: {
            id,
            value,
            order,
            checkFrag,
        },
    });

    // ユーザー認証機能を追加したらuserIdを追加。
    // モデルとずれているとエラーが発生する
    try {
        await createdCheckList.save();
    } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try again later.",
            500
        );
        return next(error);
    }

    res.status(201).json({
        user: createdCheckList.toObject({ getters: true }),
    });
};

// チェックリストドラッグアンドドロップ処理
export const checkDnD = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError(
                "無効な入力が行われました。入力内容を確認してください。" +
                    errors[0] +
                    errors[1],
                422
            )
        );
    }
    const item = req.body;
    console.log("item："+item);
    console.log("item.item："+item.item);

    let items = item.item;
    const userId = items[0].userId;
    const bookId = items[0].bookId;
    console.log("userId:"+userId,"bookId"+bookId);

    const createdCheckList = items.map((item: any) => (
        new CheckList({
            userId:item.userId,
            bookId:item.bookId,
            checkListId: {
                id:item.id,
                value:item.value,
                order:item.order,
                checkFrag:item.checkFrag,
            },
        })
    ));

    // ユーザー認証機能を追加したらuserIdを追加。
    // モデルとずれているとエラーが発生する
    try {
        checkList.remove({ userId: userId, bookId: bookId });
        // createdCheckList.save();
        createdCheckList.map((checkList:any)=>{
            checkList.save();
        })
    } catch (err) {
        const error = new HttpError(
            "Signing up failed, please try again later.",
            500
        );
        return next(error);
    }

    res.status(201).json({
        
    });
};
