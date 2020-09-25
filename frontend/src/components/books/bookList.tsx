import React, { useCallback, useState, useMemo } from "react";

import Card from "../../shared/components/UIElements/Card";
import Book from "./book/book";

import "./bookList.css";

function RenderBooks(isLoading: any, books: any, setLoadedBook: any) {
    useMemo(() => {
        const renderBook: any = [];
        books.map((book: any) => renderBook.push(<Book book={book} />));
        setLoadedBook(renderBook);
        // console.log('bookList_RenderBokks:'+books);
    }, [isLoading, books]);
}

function BookState(): any {
    const [loadedBook, setLoadedBook] = useState([]);
    return [loadedBook, setLoadedBook];
}

const bookList = (props: any) => {
    // console.log('books:'+props.books);
    // console.log('props.books.length:'+props.books.length);
    const [loadedBook, setLoadedBook] = BookState();
    RenderBooks(props.flug, props.books, setLoadedBook);

    // const renderBook: any = [];

    const renderBook = props.books.map((book: any, index:any) => (
        // <div className="bookListContent">
            <Book key={"bookList"+index} book={book} />
        // </div>
    ));

    if (props.books.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No books found.</h2>
                </Card>
            </div>
        );
    }

    // return loadedBook;
    return renderBook;
};

export default bookList;
