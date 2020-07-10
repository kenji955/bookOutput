import React from "react";
import { Link } from "react-router-dom";

import "./book.css";

import Card from "../../../shared/components/UIElements/Card";

const book = (props: any) => {
    return (
        <Link
            to={{
                pathname: `/books/${props.book.bookId}`,
            }}
        >
            <Card className="book">
                <img src={props.book.image} />
                <h2>{props.book.name}</h2>
                <hr />
                <p>{props.book.author}</p>
                <p>{props.book.publishedDate}</p>
                <p>{props.book.description}</p>
            </Card>
        </Link>
    );
};

export default book;
