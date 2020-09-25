import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import Book from "../models/book";
import CheckList from "../models/checkList";

export const getUserBooks = async (req, res, next) => {
    let books;
    const userId = req.params.userId;
    // const { userId } = req.body;
    // console.log("userIdのチェック：" + userId);

    try {
        books = await Book.find({ userId: userId }, function (err) {
            if (err) {
                res.send(err);
                console.log(err);
            }
        })
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

// サイドメニューの本+チェックリスト一覧取得処理
export const getUserBooksAndCheck = async (req, res, next) => {
    let books, bookCheck;
    const userId = req.params.userId;
    // const { userId } = req.body;
    // console.log("userIdのチェック：" + userId);

    try {
        books = await Book.find({ userId: userId }, function (err) {
            if (err) {
                res.send(err);
                console.log(err);
            }
        }).lean();
        // .exec((error, result) => {
        //     // console.log("books:" + result);
        //     res.json({ books: result });
        // });
        bookCheck = await CheckList.find({ userId: userId }, function (err) {
            if (err) {
                res.send(err);
                console.log(err);
            }
        });
    } catch (err) {
        const error = new HttpError(
            "本の取得に失敗しました。お手数ですが、後ほどもう一度お試しください。",
            500
        );
        return next(error);
    }
    res.json({
        books: books,
        checkList: bookCheck,
    });
    // res.json({ books: books.map((book) => book.toObject({ getters: true })) });
    // console.log("books：" + books.id);
    // res.json({ books: books});
};

// チェックリスト取得処理
export const checkBook = async (req, res, next) => {
    let books;
    const bookId = req.params.bookId;
    const userId = req.params.userId;

    let bookInfoResult, bookCheck;
    try {
        bookInfoResult = await Book.findOne(
            { bookId: bookId, userId: userId },
            function (err) {
                if (err) {
                    res.send(err);
                    console.log(err);
                }
            }
        );
        bookCheck = await CheckList.find(
            { bookId: bookId, userId: userId },
            function (err) {
                if (err) {
                    res.send(err);
                    console.log(err);
                }
            }
        );
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
    });
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
        existingBook = await Book.findOne(
            { id: bookId, userId: userId },
            function (err) {
                if (err) {
                    res.send(err);
                    console.log(err);
                }
            }
        );
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
export const checkDnD = (req, res, next) => {
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
    console.log("item：" + item);
    console.log("item.item：" + item.item);

    let items = item.item;
    const userId = items[0].userId;
    const bookId = items[0].bookId;
    console.log("userId:" + userId, "bookId:" + bookId);
    console.log;

    const createdCheckList = items.map(
        (item: any) =>
            new CheckList({
                userId: item.userId,
                bookId: item.bookId,
                checkListId: {
                    id: item.checkListId.id,
                    value: item.checkListId.value,
                    order: item.checkListId.order,
                    checkFrag: item.checkListId.checkFrag,
                },
            })
    );

    // ユーザー認証機能を追加したらuserIdを追加。
    // モデルとずれているとエラーが発生する
    try {
        // CheckList.remove({ userId: userId, bookId: bookId });
        // createdCheckList.save();
        // console.log("createdCheckList:"+createdCheckList);
        // createdCheckList.map((item: any) =>
        //     console.log("value:" + item.checkListId.value + "  order:" + item.checkListId.order)
        // );
        items.map((CLitem: any) => {
            // CLitem.remove({
            //     userId:CLitem.userId,
            //     bookId:CLitem.bookId,
            //     checkListId: {
            //         id: CLitem.checkListId.id,
            //     },
            // });
            // CLitem.save();

            let find = CheckList.findOne(
                {
                    bookId: bookId,
                    userId: userId,
                    "checkListId.id": CLitem.checkListId.id,
                },
                function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Result : ", docs);
                    }
                }
            );

            // console.log("テスト:" + find);
            // console.log("userId:" + CLitem.userId);
            // console.log("bookId:" + CLitem.bookId);
            // console.log("id:" + CLitem.checkListId.id);
            // console.log("order:" + CLitem.checkListId.order);

            CheckList.findOneAndUpdate(
                {
                    userId: CLitem.userId,
                    bookId: CLitem.bookId,
                    "checkListId.id": CLitem.checkListId.id,
                },
                { $set: { "checkListId.order": CLitem.checkListId.order } },
                { new: true },
                function (err, doc) {
                    if (err) {
                        res.send(err);
                        console.log(err);
                    }
                    // res.json({ message: "User update!" });
                    console.log("doc:" + doc);
                }
            );
        });
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Signing up failed, please try again later.",
            500
        );
        return next(error);
    }

    res.status(201).json({});
};
