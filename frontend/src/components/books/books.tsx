import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./books.css";

import Book from "./book/book";
import TimeLine from "../timeLine/timeLine";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

// DBとの接続用関数
function HTTPClient() {
    return useHttpClient();
}

// ログインしているアカウント情報を取得する関数
function Context() {
    console.log("useContext(AuthContext):" + useContext(AuthContext).userId);
    return useContext(AuthContext);
}

// DBから取得したデータを管理するstateを作成する関数
function LoadState(): any {
    const [loadedBookinfo, setLoadedBookinfo] = useState([]);
    return [loadedBookinfo, setLoadedBookinfo];
}

// ユーザーごとの登録された本をDBから取得してstateに格納する関数
function Fetchbook(
    sendRequest: (
        url: any,
        method?: any,
        body?: any,
        headers?: any
    ) => Promise<any>,
    setLoadedBookinfo: any,
    auth: any
): any {
    useEffect(() => {
        console.log("Fetchbook実行チェック");
        console.log("authチェック:" + auth.userId);
        const fetchBooks = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/books/user/" + auth.userId
                );

                // バックエンド→DBに接続し、受け取ったデータからユーザー情報を抽出、stateに保管している。
                // ログイン有無にかかわらず、認証画面にユーザーリストを表示するため
                setLoadedBookinfo(responseData.books);
            } catch (err) {
                console.log(err);
            }
        };
        fetchBooks();
    }, [sendRequest]);
}

const books = (props: any) => {
    // 本のIDと情報を取得
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const [loadedBookinfo, setLoadedBookinfo] = LoadState();
    // ここで↓の処理をすればuserIdも取得できる。userID+bookIdで一意のチェックリストを呼び出せる
    const auth = Context();

    Fetchbook(sendRequest, setLoadedBookinfo, auth);

    const bookList: any = [];

    // DBから情報を取得したことを確認してから登録された本の一覧を作成する
    if (!isLoading && loadedBookinfo) {
        console.log("booksの確認：" + loadedBookinfo);
        loadedBookinfo.forEach((book: any) => {
            bookList.push(
                // <Card className="book">
                //     <img src={book.image} />
                //     <h2>{book.name}</h2>
                //     <hr />
                //     <p>{book.author}</p>
                //     <p>{book.publishedDate}</p>
                //     <p>{book.description}</p>
                // </Card>
                <Book book={book} />
            );
        });
    }
    return (
        <div className="marge">
            <div className="books">
                {bookList}
                {/* テスト。DB、バックエンド、フロントエンド接続 */}
                {/* {bookInfoList(isLoading, loadedBookinfo)} */}
            </div>
            <TimeLine />
            <Link to="/books/register" className="register_button">
                本登録
            </Link>
        </div>
    );
};

export default books;
