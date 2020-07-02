import React from "react";
import { Link } from 'react-router-dom';

import "./book.css";

import Card from "../../../shared/components/UIElements/Card";

const book = (props: any) => {
    return (
        <Card className="book">
            <Link to={{
                pathname: `/books/${props.book.id}`,
            }}>
                <h2>{props.book.name}</h2>
                <hr />
                <p>{props.book.author}</p>
                <p>{props.book.test}</p>
            </Link>
        </Card>
    );
};

export default book;
