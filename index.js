require('dotenv').config();

//Using Uptime Robot + Heroku (Express)
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.get('/', function (req, res) {
    res.sendStatus(200);
});

let authentication = require('./helper/authentication');
let { countViewTitle } = require('./controllers/youtube');

authentication(() => countViewTitle);
setInterval(() => {
    authentication(() => countViewTitle);
}, 600000); // Limit 10000 units (update with 50 units)

app.listen(PORT);