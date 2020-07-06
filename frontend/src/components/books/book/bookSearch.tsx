import React, { useState, useEffect } from "react";

import "./book.css";

import Card from "../../../shared/components/UIElements/Card";
import Input from "../../../shared/components/FormElements/Input";
import Button from "../../../shared/components/FormElements/Button";

import { useHttpClient } from "../../../shared/hooks/http-hook";

function HTTPClient() {
    return useHttpClient();
}

function LoadState(): any {
    const [loadedBookinfo, setLoadedBookinfo] = useState();
    return [loadedBookinfo, setLoadedBookinfo];
}

function SearchBook(
    // event: any,
    sendRequest: (
        url: any,
        method?: any,
        body?: any,
        headers?: any
    ) => Promise<any>,
    setLoadedBookinfo: any
) {
    // event.preventDefault();

    const fetchBookInfo = async () => {
        console.log("check");
        try {
            const responseData = await sendRequest(
                "https://www.googleapis.com/books/v1/volumes?q=白夜行"
            );

            // バックエンド→DBに接続し、受け取ったデータからユーザー情報を抽出、stateに保管している。
            // ログイン有無にかかわらず、認証画面にユーザーリストを表示するため
            setLoadedBookinfo(responseData.items[0].volumeInfo);
            console.log(responseData);
        } catch (err) {}
    };
    fetchBookInfo();
    // [sendRequest]
}

// 本の情報表示項目作成処理。DBからのロード完了し、データが届いたら表示される。
function bookInfoList(isLoading: boolean, loadedBookinfo: any, book: any) {
    if (!isLoading && loadedBookinfo) {
        // console.log('bookInfoList:'+loadedBookinfo[0].id);
        book(loadedBookinfo.title);
        return (
            <Card>
                <div className="bookInfo">
                    <p>{loadedBookinfo.title}</p>
                    <p>{loadedBookinfo.authors}</p>
                </div>
            </Card>
        );
    }
}

const bookRegister = (props: any) => {
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const [loadedBookinfo, setLoadedBookinfo] = LoadState();

    const bookSearchHandler = async (event: any) => {
        event.preventDefault();
        SearchBook(sendRequest, setLoadedBookinfo);
    };

    return (
        <Card>
            <form onSubmit={bookSearchHandler}>
                {/* <Input
                    element="input"
                    id="author"
                    type="text"
                    label="本：author"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="作者名を入力してください。"
                    onInput={inputHandler}
                /> */}

                <Button type="submit">検索</Button>
            </form>
            {bookInfoList(isLoading, loadedBookinfo, props.book)}
        </Card>
    );
};

export default bookRegister;
