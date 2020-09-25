import React from "react";
import Card from "../../shared/components/UIElements/Card";

import "./registerbook.css";

// ここで画面右に表示する本一覧のレイアウトを作成する
// 横長で大きくないリストにする。小さいサムネイル、タイトル、チェックリストだけの構成

function sortAry(check: []) {
    return check.sort(function (a: any, b: any) {
        if (a.checkListId.order > b.checkListId.order) {
            return 1;
        } else {
            return -1;
        }
    });
}

const registerBook = (props: any) => {
    let renderCheck;
    if (props.checkListItem) {
        let checks: [] = sortAry(props.checkListItem);
        renderCheck = checks.map((check: any) => (
            <span className="bookCheckListContent">
                {check.checkListId.order}:{check.checkListId.value}<br></br>
            </span>
        ));
    }

    return (
        <Card className="registerBook">
            <img src={props.book.image} className="thumbnail" />
            <div className="bookContent">
                <span className="bookName"><strong>{props.book.name}</strong></span>
                <br></br>
                <hr></hr>
                {renderCheck}
                {/* <p>{props.book.author}</p>
                    <p>{props.book.publishedDate}</p> */}
                {/* <p>{props.book.description}</p> */}
            </div>
        </Card>
    );
};

export default registerBook;
