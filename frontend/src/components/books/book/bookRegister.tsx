import React, { useState, useEffect, useContext } from "react";

import "./book.css";

import Card from "../../../shared/components/UIElements/Card";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import BookSearch from "./bookSearch";

function HTTPClient() {
    return useHttpClient();
}

function Context() {
    console.log('useContext(AuthContext):'+useContext(AuthContext).userId);
    return useContext(AuthContext);
}

// function LoadState(): any {
//     const [loadedBookinfo, setLoadedBookinfo] = useState();
//     return [loadedBookinfo, setLoadedBookinfo];
// }

function BookForm() {
    return useForm(
        {
            id: {
                value: "",
                isValid: false,
            },
            name: {
                value: "",
                isValid: false,
            },
            author: {
                value: "",
                isValid: false,
            },
        },
        false
    );
}

const bookRegister = (props: any) => {
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const auth = Context();
    console.log("userId:" + auth.isLoggedIn);
    // const [loadedBookinfo, setLoadedBookinfo] = LoadState();

    const [formState, inputHandler, setFormData] = BookForm();

    const bookSubmitHandler = async (event: any) => {
        event.preventDefault();

        try {
            const responseData = await sendRequest(
                "http://localhost:5000/books/register",
                "POST",
                JSON.stringify({
                    bookId: formState.inputs.id.value,
                    name: formState.inputs.name.value,
                    author: formState.inputs.author.value,
                }),
                {
                    "Content-Type": "application/json",
                }
            );
        } catch (err) {}
    };

    // これをsearchedBookに移動する
    // const searchBookSubmitHandler = async (
    //     id: any,
    //     image: any,
    //     name: any,
    //     author: any,
    //     publishedDate: any,
    //     description: any
    // ) => {
    //     try {
    //         const responseData = await sendRequest(
    //             "http://localhost:5000/books/register",
    //             "POST",
    //             JSON.stringify({
    //                 userId: auth.userId,
    //                 bookId: id,
    //                 name: name,
    //                 author: author,
    //                 image:image,
    //                 publishedDate:publishedDate,
    //                 description:description
    //             }),
    //             {
    //                 "Content-Type": "application/json",
    //             }
    //         );
    //     } catch (err) { }
    // };

    return (
        <React.Fragment>
            <Card className="book">
                <form onSubmit={bookSubmitHandler}>
                    <Input
                        element="input"
                        id="id"
                        type="text"
                        label="本：id"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="idを入力してください。"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="本：name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="本の名前を入力してください。"
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="author"
                        type="text"
                        label="本：author"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="作者名を入力してください。"
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        登録
                    </Button>
                </form>
            </Card>
            <BookSearch auth={auth} />
        </React.Fragment>
    );
};

export default bookRegister;
