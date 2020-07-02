import React from "react";
import { useLocation, useParams } from 'react-router-dom';

import "./bookCheck.css";

import Book from './book/book';
import TimeLine from '../timeLine/timeLine';


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

let itemElements: {
    name: string;
    test: string;
}[] = [
        {
            name: "ももたろう",
            test: "test",
        },
        {
            name: "星の王子さま",
            test: "test",
        },
        {
            name: "めっちゃええ感じの本",
            test: "test",
        },
        {
            name: "おもちもちもち",
            test: "test",
        },
    ];

// URLから本のIDを取得
function BookLocation() {
    const url = useLocation();
    // const test = [];
    // test = bookElements;
    // const bookElement = test.filter(place => place.creator === userId);
    const bookId = url.pathname.split('/')[2];
    const bookElement = bookElements.filter(book => book.id != bookId);
    return { bookId, bookElement };
}

const bookCheck: React.FC = (props: any) => {
    const { bookId, bookElement } = BookLocation();
    return (
        <div className="marge">
            <div className="bookInfo">
                <p>{bookId}</p>
                <p>{bookElement[0].name}</p>
            </div>
            <div className="checkList">
                {itemElements.map((item: any) => (
                    <div className={`checkListItem`} style={item.style}>
                    {item.name}
                    <br></br>
                    {item.test}
                </div>
                ))}
            </div>
            <TimeLine />
        </div>
    );
};

export default bookCheck;
