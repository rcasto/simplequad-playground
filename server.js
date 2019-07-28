const express = require('express');

const port = process.env.PORT || 3000;

function init() {
    const app = express();

    app.use(express.static('./'));

    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

    app.listen(port,
        () => console.log(`Server started on port ${port}`));
}

init();