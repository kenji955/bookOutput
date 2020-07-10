import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import "./bookCheck.css";

import TimeLine from "../timeLine/timeLine";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";

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

let itemElements: {
    name: string;
    test: string;
}[] = [
    {
        name: "ももたろう",
        test: "test",
    },
    {
        name: "星の王子さま",
        test: "test",
    },
    {
        name: "めっちゃええ感じの本",
        test: "test",
    },
    {
        name: "おもちもちもち",
        test: "test",
    },
];

// URLから本のIDを取得
function BookLocation() {
    const url = useLocation();
    // const test = [];
    // test = bookElements;
    // const bookElement = test.filter(place => place.creator === userId);
    const bookId = url.pathname.split("/")[2];
    // const bookElement = bookElements.filter((book) => book.id !== bookId);
    return { bookId };
}

// 本の情報表示項目作成処理。DBからのロード完了し、データが届いたら表示される。
function bookInfoList(isLoading: boolean, loadedBookinfo: any) {
    if (!isLoading && loadedBookinfo) {
        // console.log('bookInfoList:'+loadedBookinfo[0].id);
        return (
            <Card className="book">
                <img src={loadedBookinfo.image} />
                <h2>{loadedBookinfo.name}</h2>
                <hr />
                <p>{loadedBookinfo.author}</p>
                <p>{loadedBookinfo.publishedDate}</p>
                <p>{loadedBookinfo.description}</p>
            </Card>
        );
    }
}

function HTTPClient() {
    return useHttpClient();
}

// ログインしているアカウント情報を取得する関数
function Context() {
    return useContext(AuthContext);
}

function LoadBookState(): any {
    const [loadedBookinfo, setLoadedBookinfo] = useState();
    return [loadedBookinfo, setLoadedBookinfo];
}

function LoadCheckState(): any {
    const [loadedCheckinfo, setLoadedCheckinfo] = useState();
    return [loadedCheckinfo, setLoadedCheckinfo];
}

function Fetchbook(
    sendRequest: (
        url: any,
        method?: any,
        body?: any,
        headers?: any
    ) => Promise<any>,
    setLoadedBookinfo: any,
    setLoadedCheckinfo: any,
    bookId: string,
    auth: any
): any {
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // const responseBookData = await sendRequest(
                //     "http://localhost:5000/books/info/" + bookId +'/'+ auth.userId
                // );
                const responseData = await sendRequest(
                    "http://localhost:5000/books/check/" +
                        bookId +
                        "/" +
                        auth.userId
                );

                // バックエンド→DBに接続し、受け取ったデータからユーザー情報を抽出、stateに保管している。
                // ログイン有無にかかわらず、認証画面にユーザーリストを表示するため
                setLoadedBookinfo(responseData.books);
                setLoadedCheckinfo(responseData.checkList);
                console.log("responseData.checkList:" + responseData.checkList);
            } catch (err) {}
        };
        fetchBooks();
    }, [sendRequest]);
}

const bookCheck = (props: any) => {
    // 本のIDと情報を取得
    const { bookId } = BookLocation();
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const [loadedBookinfo, setLoadedBookinfo] = LoadBookState();
    const [loadedCheckinfo, setLoadedCheckinfo] = LoadCheckState();

    // ここで↓の処理をすればuserIdも取得できる。userID+bookIdで一意のチェックリストを呼び出せる
    const auth = Context();

    Fetchbook(sendRequest, setLoadedBookinfo, setLoadedCheckinfo, bookId, auth);

    const CkeckList: any = [];
    console.log("isLoading" + isLoading);
    if (!isLoading && loadedCheckinfo) {
        loadedCheckinfo.forEach((ckeck: any) => {
            CkeckList.push(
                // <Card className="book">
                //     <img src={book.image} />
                //     <h2>{book.name}</h2>
                //     <hr />
                //     <p>{book.author}</p>
                //     <p>{book.publishedDate}</p>
                //     <p>{book.description}</p>
                // </Card>
                <div className={`checkListItem`}>
                    <p>{ckeck.checkListId.value}</p>
                </div>
            );
        });
        // CkeckList.push (<div className={`checkListItem`}>
        //             <p>{loadedCheckinfo.checkListId.value}</p>
        //         </div>)
    }

    if (!isLoading && loadedBookinfo) {
        console.log("booksの確認：" + loadedBookinfo);
    }

    const checkListSubmitHandler = async (event: any) => {
        event.preventDefault();

        try {
            const responseData = await sendRequest(
                "http://localhost:5000/books/register/check",
                "POST",
                JSON.stringify({
                    userId: auth.userId,
                    bookId: bookId,
                    checkListId: {
                        id: "1",
                        value: "もちもちもちもちもちもち",
                        checkFrag: false,
                    },
                }),
                {
                    "Content-Type": "application/json",
                }
            );
        } catch (err) {}
        // チェックリストを追加したら画面を更新したい。
        // Fetchbook(sendRequest, setLoadedBookinfo, setLoadedCheckinfo, bookId, auth);
    };

    return (
        // 全体表示
        <div className="marge">
            {/* 選択された本の情報 */}
            {/* <div className="bookInfo">
                <p>{bookId}</p>
                <p>{bookElement[0].name}</p>
            </div> */}

            {/* テスト。DB、バックエンド、フロントエンド接続 */}
            {bookInfoList(isLoading, loadedBookinfo)}

            {/* 本に紐付くチェックリスト */}
            <div className="checkList">
                {/* {itemElements.map((item: any) => (
                    <div className={`checkListItem`} style={item.style}>
                        {item.name}
                        <br></br>
                        {item.test}
                    </div>
                ))} */}
                {CkeckList}
                <div
                    onClick={checkListSubmitHandler}
                    className="register_button"
                >
                    チェック
                </div>
            </div>
            {/* タイムライン表示 */}
            <TimeLine />
        </div>
    );
};

export default bookCheck;
