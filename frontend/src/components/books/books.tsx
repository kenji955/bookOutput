import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./books.css";

import Book from "./book/book";
import TimeLine from "../timeLine/timeLine";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

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

// const bookInfoList = (isLoading: boolean, loadedBookinfo: any) => {
//     if (!isLoading && loadedBookinfo) {
//         // console.log('bookInfoList:'+loadedBookinfo[0].id);
//         const bookList = loadedBookinfo.map((book: any) => (
//             <Card className="book">
//                 <img src={book.image} />
//                 <h2>{book.name}</h2>
//                 <hr />
//                 <p>{book.author}</p>
//                 <p>{book.publishedDate}</p>
//                 <p>{book.description}</p>
//             </Card>
//         ));
//         return bookList;
//     }
// }

function HTTPClient() {
    return useHttpClient();
}

function Context() {
    console.log("useContext(AuthContext):" + useContext(AuthContext).userId);
    return useContext(AuthContext);
}

function LoadState(): any {
    const [loadedBookinfo, setLoadedBookinfo] = useState([]);
    return [loadedBookinfo, setLoadedBookinfo];
}

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

    if (loadedBookinfo) {
        console.log("booksの確認：" + loadedBookinfo);
        loadedBookinfo.forEach((book: any) => {
            bookList.push(
                <Card className="book">
                    <img src={book.image} />
                    <h2>{book.name}</h2>
                    <hr />
                    <p>{book.author}</p>
                    <p>{book.publishedDate}</p>
                    <p>{book.description}</p>
                </Card>
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
