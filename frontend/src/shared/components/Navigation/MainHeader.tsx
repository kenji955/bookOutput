import React from "react";

import "./MainHeader.css";

interface NavigationProps {
    children: any;
}

const MainHeader: React.FC<NavigationProps> = (props) => {
    return <header className="main-header">{props.children}</header>;
};

export default MainHeader;
