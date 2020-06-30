import React from "react";

import "./books.css";

import Book from "./book/book";
import TimeLine from "../timeLine/timeLine";

let bookElements: {
    name: string;
    author: string;
    test: string;
}[] = [
    {
        name: "ももたろう",
        author: "author",
        test: "test",
    },
    {
        name: "星の王子さま",
        author: "author",
        test: "test",
    },
    {
        name: "めっちゃええ感じの本",
        author: "author",
        test: "test",
    },
    {
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
        </div>
    );
};

export default books;
