import React from 'react';
import ReactDOM from 'react-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";


import './index.css';
import App from './App';

library.add(faGripVertical);

ReactDOM.render(<App />, document.getElementById('root'));
