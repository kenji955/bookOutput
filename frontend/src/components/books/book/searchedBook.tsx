import React from "react";
import { Link } from "react-router-dom";

import "./book.css";

import Card from "../../../shared/components/UIElements/Card";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Button from "../../../shared/components/FormElements/Button";

function HTTPClient() {
    return useHttpClient();
}

const searchedBook = (props: any) => {
    const { isLoading, error, sendRequest, clearError } = HTTPClient();

    const searchBookSubmitHandler = async (
        event: any
        // id: any,
        // image: any,
        // name: any,
        // author: any,
        // publishedDate: any,
        // description: any
    ) => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                "http://localhost:5000/books/register",
                "POST",
                JSON.stringify({
                    userId: props.auth.userId,
                    bookId: props.id,
                    name: props.name,
                    author: props.author,
                    image: props.image,
                    publishedDate: props.publishedDate,
                    description: props.description,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
        } catch (err) {}
    };

    return (
        // <Link to={{
        //     pathname: `/books/${props.book.id}`
        // }}>
        <Card className="book">
            <form onSubmit={searchBookSubmitHandler}>
                <img src={props.image} />
                <h2>{props.name}</h2>
                <hr />
                <p>{props.author}</p>
                <p>{props.publishedDate}</p>
                <p>{props.description}</p>
                <Button type="submit">登録</Button>
            </form>
        </Card>
        // </Link>
    );
};

export default searchedBook;
