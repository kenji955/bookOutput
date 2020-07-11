import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import "./books.css";

import Book from "./book/book";
import TimeLine from "../timeLine/timeLine";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import BookList from "./bookList";

// DBとの接続用関数
function HTTPClient() {
    return useHttpClient();
}

// ログインしているアカウント情報を取得する関数
function Context() {
    return useContext(AuthContext);
}

// DBから取得したデータを管理するstateを作成する関数
function LoadState(): any {
    const [loadedBookinfo, setLoadedBookinfo] = useState([]);
    return [loadedBookinfo, setLoadedBookinfo];
}

function RenderState(): any {
    const [RenderBook, setRenderBook] = useState();
    return [RenderBook, setRenderBook];
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
    loadedBookinfo: any
): any {
    const auth2 = useContext(AuthContext);
    useMemo(() => {
        // console.log("Fetchbook実行チェック");
        // console.log("authチェック:" + auth.userId);
        const fetchBooks = async () => {
            try {
                console.log('auth222.userId:'+auth2.userId);
                const responseData = await sendRequest(
                    "http://localhost:5000/books/user/" + auth2.userId
                );

                // バックエンド→DBに接続し、受け取ったデータからユーザー情報を抽出、stateに保管している。
                // ログイン有無にかかわらず、認証画面にユーザーリストを表示するため
                setLoadedBookinfo(responseData.books);
                return responseData.books;
            } catch (err) {
                console.log(err);
            }
        };
        const renderBook = async ()=>{
            try {
                 
                const render = await fetchBooks();
                setLoadedBookinfo(render);
            } catch (err) {
                console.log(err);
            }
        }
        // fetchBooks();
        renderBook();
        console.log('loadedBookinfo:'+loadedBookinfo);
        // RenderBooks(isLoading, loadedBookinfo,setRenderBook);
        
    }, [sendRequest,auth2]);
}

// function RenderBooks(isLoading: any, loadedBookinfo: any,setRenderBook:any) {
//     useMemo(() => {
//         // setRenderBook( <BookList books={loadedBookinfo} flug={isLoading} />);
//         const renderBook:any =[];
//         loadedBookinfo.map((book: any) => renderBook.push(<Book book={book} />));
//         setRenderBook (renderBook);
//         console.log('loadedBookinfo:'+loadedBookinfo);
//         console.log('isLoading:'+isLoading);
//     }, [isLoading, loadedBookinfo]);
// }

const books = (props: any) => {
    // 本のIDと情報を取得
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const [loadedBookinfo, setLoadedBookinfo] = LoadState();
    const [RenderBook, setRenderBook] = RenderState();

    // ここで↓の処理をすればuserIdも取得できる。userID+bookIdで一意のチェックリストを呼び出せる
    // const auth = Context();

    Fetchbook(sendRequest, setLoadedBookinfo, loadedBookinfo);

    return (
        <div className="marge">
            <div className="books">
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )}
                {!isLoading && loadedBookinfo && (
                    <BookList books={loadedBookinfo} flug={isLoading} key={loadedBookinfo.bookId}/>
                )}
                {!isLoading &&
                    loadedBookinfo && RenderBook
                    }
            </div>
            <TimeLine />
            <Link to="/books/register" className="register_button">
                本登録
            </Link>
        </div>
    );
};

export default books;
