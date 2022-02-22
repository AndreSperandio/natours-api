const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res
    .status(200)
    .json({message: 'Hello from the server side!', app: 'Natours'});
});

app.post('/', (req, res) => {
    res.send('You can now access post method');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
})