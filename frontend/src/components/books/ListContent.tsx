import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListContent = (props:any) => {
  const { item, itemNum } = props;
  return (
    <Droppable droppableId={`droppable${item.id}`} type={`${itemNum}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
        >
          {item.map((item:any, index:any) => {
            return (
              <Draggable
                key={`${itemNum}${index}`}
                draggableId={`${itemNum}${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <span {...provided.dragHandleProps}>
                      <FontAwesomeIcon
                        icon={"grip-vertical"}
                        style={{ float: "left" }}
                      />
                    </span>
                    {item}
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ListContent;
