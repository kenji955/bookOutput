import React from "react";

import "./timeLine.css";

import TimeItem from "../../shared/components/UIElements/timeItem";

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

const timeLine = (props: any) => {
    return (
        <div className="timeLine">
            {itemElements.map((item: any) => (
                <TimeItem item={item} />
            ))}
            {itemElements.map((item: any) => (
                <TimeItem item={item} />
            ))}
            {itemElements.map((item: any) => (
                <TimeItem item={item} />
            ))}
            {itemElements.map((item: any) => (
                <TimeItem item={item} />
            ))}
        </div>
    );
};

export default timeLine;
