import React from "react";

import "./timeLine.css";

import TimeItem from "../../shared/components/UIElements/timeItem";

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
