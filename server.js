const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;

function init() {
    const app = express();

    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

    app.get('*', (req, res) => {
        res.redirect('/');
    });

    app.listen(port,
        () => console.log(`Server started on port ${port}`));
}

init();