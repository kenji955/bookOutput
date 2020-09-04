import React, { useCallback, useState, useMemo } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const [CheckList, setCheckList] = CheckListState();
    RenderCheckList(props.flug, props.items, setCheckList);

    // const renderBook: any = [];
    let i = 0;
    const renderBook =
        // props.items.map((item: any) => (
        //     <div className={`checkListItem`}>
        //         <p>{item.checkListId.value}</p>
        //     </div>
        // ));

        props.items.map((item: any, index: any) => (
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

                        {/* ここに例題でいう「Answer」を入れる */}
                        {/* <Answers questionNum={index} question={question} /> */}
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
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: any) => {
        // はみ出し
        if (!result.destination) {
            return;
        }

        const items = reorder(
            props.items,
            result.source.index,
            result.destination.index
        );

        // props.items = items;
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {renderBook}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default checkList;
