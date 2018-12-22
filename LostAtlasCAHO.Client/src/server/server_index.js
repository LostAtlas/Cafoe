import express from 'express';
import React from "react";
import {renderToString} from "react-dom/server";
import App from '../shared/components/App';
import {StaticRouter} from "react-router-dom";

const app = express();
app.use(express.static('public'));

app.get('*', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>LostAtlas React App</title>
                <script src="/bundle.min.js"></script>
            </head>
            <body>
                <div id="app">${renderToString(<StaticRouter location={req.url}>
                    <App />
                </StaticRouter>)}</div>
            </body>
        </html>
    `);
});

app.listen(process.env.PORT || 3000, () =>{
    console.log("Server is listening...");
});