import React, { useMemo } from "react";

import "./timeLine.css";

import TimeItem from "../../shared/components/UIElements/timeItem";
import Card from "../../shared/components/UIElements/Card";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useState } from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import RegisterBookList from "./registerBookList";

// このファイルを本一覧に作り替える。
// レスポンシブ対応で、スマホサイズの場合は非表示にする

// ユーザーごとの登録された本をDBから取得してstateに格納する関数
function Fetchbook(
    sendRequest: (
        url: any,
        method?: any,
        body?: any,
        headers?: any
    ) => Promise<any>,
    setLoadedBookinfo: any,
    setLoadedCheckinfo: any
): any {
    const auth2 = useContext(AuthContext);
    useMemo(() => {
        const fetchBooks = async () => {
            try {
                // console.log("auth222.userId:" + auth2.userId);
                const responseData = await sendRequest(
                    "http://localhost:5000/books/user/" + auth2.userId + "/check"
                );

                // バックエンド→DBに接続し、受け取ったデータからユーザー情報を抽出、stateに保管している。
                // ログイン有無にかかわらず、認証画面にユーザーリストを表示するため
                setLoadedBookinfo(responseData);
                // console.log("responseData:"+responseData);
                // setLoadedBookinfo(responseData.books);
                // setLoadedCheckinfo(responseData.checkList);
                return responseData;
            } catch (err) {
                console.log(err);
            }
        };
        const renderBook = async () => {
            try {
                const render = await fetchBooks();
                setLoadedBookinfo(render);
                // setLoadedBookinfo(render.books);
                // setLoadedCheckinfo(render.checkList);
            } catch (err) {
                console.log(err);
            }
        };
        // fetchBooks();
        renderBook();
        // console.log("loadedBookinfo:" + loadedBookinfo);
        // RenderBooks(isLoading, loadedBookinfo,setRenderBook);
    }, [sendRequest, auth2]);
}

// DBとの接続用関数
function HTTPClient() {
    return useHttpClient();
}

// DBから取得したデータを管理するstateを作成する関数
function LoadBookState(): any {
    const [loadedBookinfo, setLoadedBookinfo] = useState();
    return [loadedBookinfo, setLoadedBookinfo];
}

// DBから取得したデータを管理するstateを作成する関数
function LoadCheckState(): any {
    const [loadedCheckinfo, setLoadedCheckinfo] = useState([]);
    return [loadedCheckinfo, setLoadedCheckinfo];
}

let itemElements: {
    name: string;
    test: string;
}[] = [
    {
        name: "test1",
        test: "test",
    },
    {
        name: "test2",
        test: "test",
    },
    {
        name: "test3",
        test: "test",
    },
    {
        name: "test4",
        test: "test",
    },
];

const timeLine = (props: any) => {

    // 本のIDと情報を取得
    const { isLoading, error, sendRequest, clearError } = HTTPClient();
    const [loadedBookinfo, setLoadedBookinfo] = LoadBookState();
    const [loadedCheckinfo, setLoadedCheckinfo] = LoadCheckState();

    // ここで↓の処理をすればuserIdも取得できる。userID+bookIdで一意のチェックリストを呼び出せる
    // const auth = Context();
    // setLoadedBookinfo([1]);
    console.log(loadedBookinfo);

    Fetchbook(sendRequest, setLoadedBookinfo, setLoadedCheckinfo);
    // console.log("loadedBookinfo:"+loadedBookinfo);
    // console.log("loadedCheckinfo"+loadedCheckinfo);

    return (
        <div className="timeLine">
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedBookinfo && (
                <RegisterBookList
                    books={loadedBookinfo.books}
                    checks={loadedBookinfo.checkList}
                    flug={isLoading}
                    key="RegisterBookList"
                />
            )}
            {/* <TimeLine /> */}
            {/* <BookRegister /> */}
            {/* <BookSearch /> */}
        </div>
    );
};

export default timeLine;
