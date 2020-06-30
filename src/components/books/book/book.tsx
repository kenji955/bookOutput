import React from "react";

import "./book.css";

import Card from "../../../shared/components/UIElements/Card";

const book = (props: any) => {
    return (
        <Card className="book">
            <h2>{props.book.name}</h2>
            <hr />
            <p>{props.book.author}</p>
            <p>{props.book.test}</p>
        </Card>
    );
};

export default book;
