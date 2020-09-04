import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListContent = (props:any) => {
  const { question, questionNum } = props;
  return (
    <Droppable droppableId={`droppable${question.id}`} type={`${questionNum}`}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
        >
          {question.answers.map((answer:any, index:any) => {
            return (
              <Draggable
                key={`${questionNum}${index}`}
                draggableId={`${questionNum}${index}`}
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
                    {answer}
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
