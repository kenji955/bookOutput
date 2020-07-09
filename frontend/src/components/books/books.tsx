import React from "react";
import { Link } from "react-router-dom";

import "./books.css";

import Book from "./book/book";
import TimeLine from "../timeLine/timeLine";

let bookElements: {
    id: string;
    name: string;
    author: string;
    test: string;
}[] = [
        {
            id: "1",
            name: "ももたろう",
            author: "author",
            test: "test",
        },
        {
            id: "2",
            name: "星の王子さま",
            author: "author",
            test: "test",
        },
        {
            id: "3",
            name: "めっちゃええ感じの本",
            author: "author",
            test: "test",
        },
        {
            id: "4",
            name: "おもちもちもち",
            author: "author",
            test: "test",
        },
    ];

const books = (props: any) => {
    return (
        <div className="marge">
            <div className="books">
                {bookElements.map((book: any) => (
                    <Book book={book} />
                ))}
                {bookElements.map((book: any) => (
                    <Book book={book} />
                ))}
            </div>
            <TimeLine />
            <Link
                to='/books/register'
                className='register_button'>
                本登録
            </Link>
        </div>
    );
};

export default books;
