import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";

import "./bookCheck.css";

// import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TimeLine from "../timeLine/timeLine";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";
import CheckList from "./checkList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

/*
本の個別詳細画面
各ユーザーが本ごとに設定したチェックリストを確認できる。
最終的には本を読んでやろうと思ったことのチェックリストと、それを宣言するタイムラインを作成する
*/

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
    const bookId = url.pathname.split("/")[2];
    return { bookId };
}

// 本の情報表示項目作成処理。DBからのロード完了し、データが届いたら表示される。
function bookInfoList(loadedBookinfo: any) {
    if (loadedBookinfo) {
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
    } else {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
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

function InputState(): any {
    const [inputInfo, setInputInfo] = useState();
    const inputRef = useRef();
    return [inputInfo, setInputInfo, inputRef];
}

function FlugState(): any {
    const [Flug, setFlug] = useState(false);
    return [Flug, setFlug];
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
    auth: any,
    Flug: any,
    setFlug: any
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
            } catch (err) {}
        };
        fetchBooks();
    }, [sendRequest]);
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
                setLoadedCheckinfo(responseData.checkList);
                console.log("responseData.checkList:" + responseData.checkList);
            } catch (err) {}
        };
        fetchBooks();
    }, [sendRequest, Flug]);
}

const bookCheck = (props: any) => {
    // 本のIDと情報を取得
    const { bookId } = BookLocation();
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const [loadedBookinfo, setLoadedBookinfo] = LoadBookState();
    const [loadedCheckinfo, setLoadedCheckinfo] = LoadCheckState();
    const [inputInfo, setInputInfo, inputRef] = InputState();

    const [Flug, setFlug] = FlugState();

    // ここで↓の処理をすればuserIdも取得できる。userID+bookIdで一意のチェックリストを呼び出せる
    const auth = Context();

    Fetchbook(
        sendRequest,
        setLoadedBookinfo,
        setLoadedCheckinfo,
        bookId,
        auth,
        Flug,
        setFlug
    );

    // const CheckList: any = [];
    // console.log("isLoading" + isLoading);
    // if (!isLoading && loadedCheckinfo) {
    //     loadedCheckinfo.forEach((check: any) => {
    //         CheckList.push(
    //             // <Card className="book">
    //             //     <img src={book.image} />
    //             //     <h2>{book.name}</h2>
    //             //     <hr />
    //             //     <p>{book.author}</p>
    //             //     <p>{book.publishedDate}</p>
    //             //     <p>{book.description}</p>
    //             // </Card>
    //             <div className={`checkListItem`}>
    //                 <p>{check.checkListId.value}</p>
    //             </div>
    //         );
    //     });
    //     // CheckList.push (<div className={`checkListItem`}>
    //     //             <p>{loadedCheckinfo.checkListId.value}</p>
    //     //         </div>)
    // }

    // if (!isLoading && loadedBookinfo) {
    //     console.log("booksの確認：" + loadedBookinfo);
    // }

    const checkListSubmitHandler = async (event: any) => {
        event.preventDefault();

        let inputValue = inputInfo;
        setInputInfo("");

        inputRef.current.value = "";

        let idNum = 0;
        if (loadedCheckinfo.length >= 1) {
            loadedCheckinfo.map((item: any) => {
                // console.log(
                //     "計算前 " +
                //         "idNum:" +
                //         idNum +
                //         "  item.id:" +
                //         item.checkListId.id
                // );
                if (idNum < Number(item.checkListId.id)) {
                    idNum = item.checkListId.id;
                }
                // console.log(
                //     "計算後 " +
                //         "idNum:" +
                //         idNum +
                //         "  item.id:" +
                //         item.checkListId.id
                // );
            });
            idNum = Number(idNum)+1;
        } else {
            idNum = 1;
        }
        // console.log("最終結果：" + idNum);

        try {
            const responseData = await sendRequest(
                "http://localhost:5000/books/register/check",
                "POST",
                JSON.stringify({
                    userId: auth.userId,
                    bookId: bookId,
                    checkListId: {
                        id: idNum,
                        value: inputValue,
                        order: loadedCheckinfo.length + 1,
                        checkFrag: false,
                    },
                }),
                {
                    "Content-Type": "application/json",
                }
            );
            // console.log("idNum" + idNum);
            // console.log("order" + (loadedCheckinfo.length + 1));
        } catch (err) {
            // console.log("error!Check");
        }
        // チェックリストを追加したら画面を更新したい。
        // Fetchbook(sendRequest, setLoadedBookinfo, setLoadedCheckinfo, bookId, auth);
        setFlug(!Flug);
    };

    const checkListUpdateHandler = async () => {
        console.log("バックエンドへの送信チェック："+loadedCheckinfo);
        try {
            const responseData = await sendRequest(
                "http://localhost:5000/books/dnd/check",
                "POST",
                JSON.stringify({
                    item:loadedCheckinfo
                }),
                {
                    "Content-Type": "application/json",
                }
            );
        } catch (err) {
        }
    }

    return (
        // 全体表示
        <div className="marge">
            {/* 選択された本の情報 */}
            {/* <div className="bookInfo">
                <p>{bookId}</p>
                <p>{bookElement[0].name}</p>
            </div> */}

            {/* テスト。DB、バックエンド、フロントエンド接続 */}
            {/* 本の詳細情報を表示する */}
            {bookInfoList(loadedBookinfo)}

            {/* 本に紐付くチェックリスト */}
            <div className="checkList">
                {/* {itemElements.map((item: any) => (
                    <div className={`checkListItem`} style={item.style}>
                        {item.name}
                        <br></br>
                        {item.test}
                    </div>
                ))} */}
                {/* {CheckList} */}
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )}
                {!isLoading && loadedCheckinfo && (
                    <div className="checkListContent">
                        {/* // チェックリスト作成 */}
                        <CheckList
                            items={loadedCheckinfo}
                            itemSet={setLoadedCheckinfo}
                            flug={isLoading}
                            key={
                                loadedCheckinfo.userId + loadedCheckinfo.bookId
                            }
                            update={checkListUpdateHandler}
                        />
                    </div>
                )}

                <div className="cp_iptxt">
                    <input
                        className="ef"
                        type="text"
                        placeholder=""
                        id="checkinput"
                        ref={inputRef}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setInputInfo(event.target.value);
                        }}
                    />
                    <label>本を読んで行動することは？</label>
                    <span className="focus_line">
                        <i></i>
                    </span>
                </div>

                {/* チェックリストへの項目追加処理呼び出しボタン */}
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
