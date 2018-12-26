import React from "react";
import ReactDom from "react-dom";
import App from '../shared/components/App'
import {BrowserRouter} from "react-router-dom";

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {

        ReactDom.hydrate(
            <BrowserRouter>
                <App />
            </BrowserRouter>, document.getElementById('app'));

    }
  });

