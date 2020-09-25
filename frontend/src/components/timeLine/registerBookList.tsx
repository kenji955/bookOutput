import React, { useState, useMemo } from "react";

import Card from "../../shared/components/UIElements/Card";
import RegisterBook from "./registerbook";

interface CheckContent {
    userId: string;
    bookId: string;
    checkListId: {
        id: string;
        value: string;
        order: string;
        checkFrag: { type: Boolean };
    };
}

function RenderBooks(
    isLoading: any,
    books: [object],
    checks: [CheckContent],
    setLoadedBook: any
) {
    useMemo(() => {
        const renderBook: any = [];
        let checkFilter: CheckContent[];
        books.map((book: any) => {
            checkFilter = checks.filter(
                (value: any) => value.bookId == book.bookId
            );


            renderBook.push(
                <RegisterBook
                    checkListItem={checkFilter}
                    book={book}
                    key={book.bookId + checkFilter[0].checkListId.id}
                />
            );
        });
        setLoadedBook(renderBook);
    }, [isLoading, checks]);
}

function BookState(): any {
    const [loadedBook, setLoadedBook] = useState([]);
    return [loadedBook, setLoadedBook];
}

const bookList = (props: any) => {
    const [loadedBook, setLoadedBook] = BookState();
    RenderBooks(
        props.flug,
        props.books,
        props.checks,
        setLoadedBook
    );


    if (props.books.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No books found.</h2>
                </Card>
            </div>
        );
    }

    return loadedBook;
};

export default bookList;
