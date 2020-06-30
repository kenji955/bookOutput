import React from "react";

import "./timeItem.css";

const timeItem = (props: any) => {
    return (
        <div className={`timeItem ${props.className}`} style={props.style}>
            {props.item.name}
            <br></br>
            {props.item.test}
        </div>
    );
};

export default timeItem;
