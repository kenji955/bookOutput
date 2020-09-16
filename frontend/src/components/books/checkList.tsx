import React, { useCallback, useState, useMemo } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../shared/components/UIElements/Card";
import Book from "./book/book";
import ListContent from "./ListContent";
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
    const [CheckList, setCheckList] = CheckListState();
    RenderCheckList(props.flug, props.items, setCheckList);

    // const renderBook: any = [];
    let list = props.items;
    list.sort(function(a:any,b:any){
        if(a.checkListId.order<b.checkListId.order) return -1;
        if(a.checkListId.order > b.checkListId.order) return 1;
        return 0;
    });
    let i = 0;
    const renderBook =
        // props.items.map((item: any) => (
        //     <div className={`checkListItem`}>
        //         <p>{item.checkListId.value}</p>
        //     </div>
        // ));

        // props.items.map((item: any, index: any) => (
        list.map((item: any, index: any) => (
            <Draggable
                key={item.checkListId.id}
                draggableId={item.checkListId.id}
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        className={`checkListItem`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        // {...provided.dragHandleProps}
                    >
                        <p>{item.checkListId.value}</p>
                        <span {...provided.dragHandleProps}>
                            <FontAwesomeIcon
                                icon={"grip-vertical"}
                                style={{ float: "left" }}
                            />
                        </span>
                    {console.log(item.checkListId.id)}
                        {/* ここに例題でいう「Answer」を入れる */}
                        {/* <ListContent itemNum={index} item={item} /> */}
                    </div>
                )}
            </Draggable>
        ));
    // </div>

    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>アイテムは登録されておりません。</h2>
                </Card>
            </div>
        );
    }

    // return CheckList;
    // return renderBook;

    // ここでエラーだろうなー
    // return (
    //     <DragDropContext onDragEnd={renderBook}>
    //       <Droppable droppableId="list">
    //         {provided => (
    //           <div ref={provided.innerRef} {...provided.droppableProps}>
    //             {renderBook}
    //             {provided.placeholder}
    //           </div>
    //         )}
    //       </Droppable>
    //     </DragDropContext>
    //   );

    const reorder = (list: any, startIndex: any, endIndex: any) => {
        const result = Array.from(list);
        // 配列から動かした項目を削除しremovedに保管
        const [removed] = result.splice(startIndex, 1);
        // 動かした項目を最終的な位置に挿入
        result.splice(endIndex, 0, removed);
        //ここでmapを使って、配列resultの頭から表示順を新しく振り直す
        let num=1;
        result.map((item:any)=>{
            item.checkListId.order=num;
            num++;
            console.log(item.checkListId.value);
            console.log(item.checkListId.order);
        });

        return result;
    };

    const onDragEnd = async (result: any) => {
        // はみ出し
        if (!result.destination) {
            return;
        }

        const items = reorder(
            props.items,
            result.source.index,
            result.destination.index
        );

        // propsのsetStateを利用して更新する。
        await props.itemSet(items);
        // ここで更新内容をDBに反映する
        props.update();
    };

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="checkListAll"
                        >
                            {renderBook}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default checkList;
