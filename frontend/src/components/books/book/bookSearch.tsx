import React, { useState, useEffect } from "react";

import "./book.css";

import Card from "../../../shared/components/UIElements/Card";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";
import SearchedBook from './searchedBook';

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useForm } from "../../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../../shared/util/validators";

function HTTPClient() {
    return useHttpClient();
}

function LoadState(): any {
    const [loadedBookinfo, setLoadedBookinfo] = useState();
    return [loadedBookinfo, setLoadedBookinfo];
}

function BookForm() {
    return useForm(
        {
            search: {
                value: "",
                isValid: false,
            }
        },
        false
    );
}

function SearchBook(
    // event: any,
    sendRequest: (
        url: any,
        method?: any,
        body?: any,
        headers?: any
    ) => Promise<any>,
    setLoadedBookinfo: any,
    formState: any
) {
    // event.preventDefault();

    const fetchBookInfo = async () => {
        console.log("check");
        try {
            const responseData = await sendRequest(
                // テストのため検索結果を1件にしている
                `https://www.googleapis.com/books/v1/volumes?q=${formState.inputs.search.value}&maxResults=1`
            );

            // バックエンド→DBに接続し、受け取ったデータからユーザー情報を抽出、stateに保管している。
            // ログイン有無にかかわらず、認証画面にユーザーリストを表示するため
            setLoadedBookinfo(responseData.items);
            console.log(responseData);
        } catch (err) { }
    };
    fetchBookInfo();
    // [sendRequest]
}

// 本の情報表示項目作成処理。DBからのロード完了し、データが届いたら表示される。
function bookInfoList(isLoading: boolean, loadedBookinfo: any, auth: any) {
    if (!isLoading && loadedBookinfo) {
        // console.log('bookInfoList:'+loadedBookinfo[0].id);
        // book(loadedBookinfo.title);
        const bookList = loadedBookinfo.map((bookInfo: any) => (
            <SearchedBook 
                id={bookInfo.id}
                name={bookInfo.volumeInfo.title}
                author={bookInfo.volumeInfo.authors[0]}
                image={bookInfo.volumeInfo.imageLinks.thumbnail}
                description={bookInfo.volumeInfo.description}
                publishedDate={bookInfo.volumeInfo.publishedDate}
                auth={auth}
            />
        ))
        return (
            <div className="books">
                {bookList}
            </div>
        );
    }
}

const bookSearch = (props: any) => {
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const [loadedBookinfo, setLoadedBookinfo] = LoadState();
    const [formState, inputHandler, setFormData] = BookForm();

    const bookSearchHandler = async (event: any) => {
        event.preventDefault();
        SearchBook(sendRequest, setLoadedBookinfo, formState);
    };

    return (
        <Card>
            <form onSubmit={bookSearchHandler}>
                <Input
                    element="input"
                    id="search"
                    type="text"
                    label="書籍名 OR 作者名"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="書籍名 OR 作者名を入力してください。"
                    onInput={inputHandler}
                />

                <Button type="submit">検索</Button>
            </form>
            {bookInfoList(isLoading, loadedBookinfo, props.auth)}
        </Card>
    );
};

export default bookSearch;
