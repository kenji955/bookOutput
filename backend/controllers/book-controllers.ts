import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import Book from "../models/book";

export const getbook = async (req, res, next) => {
    let books;
    const bookId = req.params.bookId;
    console.log("bookIDのチェック：" + req.params.bookId);

    try {
        books = await Book.findOne({ id: bookId }).lean().exec((error,result)=>{
            console.log('books:'+result);
            res.json({ books: result});
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

export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError(
                "無効な入力が行われました。入力内容を確認してください。",
                422
            )
        );
    }
    const { id, name, author } = req.body;

    let existingBook;
    try {
        existingBook = await Book.findOne({ id: id });
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

    const createdBook = new Book({
        id,
        name,
        author,
    });

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
