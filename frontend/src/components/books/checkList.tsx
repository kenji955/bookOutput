import React, { useCallback, useState, useMemo } from "react";

import Card from "../../shared/components/UIElements/Card";
import Book from "./book/book";
import "./checkList.css";

function RenderCheckList(isLoading: any, items: any, setCheckList: any) {
    useMemo(() => {
        const renderBook: any = [];
        items.map((item: any) =>
            renderBook.push(
                <div className={`checkListItem`}>
                    <p>{item.checkListId.value}</p>
                </div>
            )
        );
        setCheckList(renderBook);
        // console.log('bookList_RenderBokks:'+items);
    }, [isLoading, items]);
}

function CheckListState(): any {
    const [CheckList, setCheckList] = useState([]);
    return [CheckList, setCheckList];
}

const checkList = (props: any) => {
    // console.log('items:'+props.items);
    // console.log('props.items.length:'+props.items.length);
    const [CheckList, setCheckList] = CheckListState();
    RenderCheckList(props.flug, props.items, setCheckList);

    // const renderBook: any = [];

    const renderBook =
        // <div className="book-list">
        props.items.map((item: any) => (
            <div className={`checkListItem`}>
                <p>{item.checkListId.value}</p>
            </div>
        ));
    // </div>

    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No items found.</h2>
                </Card>
            </div>
        );
    }

    // return CheckList;
    return renderBook;
};

export default checkList;
