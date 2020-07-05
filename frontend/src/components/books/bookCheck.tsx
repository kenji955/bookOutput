import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./bookCheck.css";

import TimeLine from "../timeLine/timeLine";
import { useHttpClient } from "../../shared/hooks/http-hook";

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
    const bookElement = bookElements.filter((book) => book.id !== bookId);
    return { bookId, bookElement };
}

// 本の情報表示項目作成処理。DBからのロード完了し、データが届いたら表示される。
function bookInfoList(isLoading: boolean, loadedBookinfo: any) {
    if (!isLoading && loadedBookinfo) {
        // console.log('bookInfoList:'+loadedBookinfo[0].id);
        return (
            <div className="bookInfo">
                <p>{loadedBookinfo.id}</p>
                <p>{loadedBookinfo.name}</p>
                <p>{loadedBookinfo.author}</p>
            </div>
        );
    }
}

function HTTPClient() {
    return useHttpClient();
}

function LoadState(): any {
    const [loadedBookinfo, setLoadedBookinfo] = useState();
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
    bookId: string
): any {
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/books/" + bookId
                );

                // バックエンド→DBに接続し、受け取ったデータからユーザー情報を抽出、stateに保管している。
                // ログイン有無にかかわらず、認証画面にユーザーリストを表示するため
                setLoadedBookinfo(responseData.books);
            } catch (err) {}
        };
        fetchBooks();
    }, [sendRequest]);
}

const bookCheck = () => {
    // 本のIDと情報を取得
    const { bookId, bookElement } = BookLocation();
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const [loadedBookinfo, setLoadedBookinfo] = LoadState();

    Fetchbook(sendRequest, setLoadedBookinfo, bookId);
    if (loadedBookinfo) {
        console.log("booksの確認：" + loadedBookinfo);
    }
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const responseData = await sendRequest(
    //                 "http://localhost:5000//books/:bookId"
    //             );

    //             // バックエンド→DBに接続し、受け取ったデータからユーザー情報を抽出、stateに保管している。
    //             // ログイン有無にかかわらず、認証画面にユーザーリストを表示するため
    //             setLoadedBookinfo(responseData.users);
    //         } catch (err) {}
    //     };
    //     fetchUsers();
    // }, [sendRequest]);

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
                {itemElements.map((item: any) => (
                    <div className={`checkListItem`} style={item.style}>
                        {item.name}
                        <br></br>
                        {item.test}
                    </div>
                ))}
            </div>
            {/* タイムライン表示 */}
            <TimeLine />
        </div>
    );
};

export default bookCheck;
