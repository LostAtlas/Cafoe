import React from "react";
import ReactDom from "react-dom";
import App from '../shared/components/App'
import {BrowserRouter} from "react-router-dom";


ReactDom.hydrate(
<BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById('app'));
