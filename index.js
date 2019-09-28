const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
require('dotenv/config')
const cors = require('cors');
const mongoose = require('mongoose')
const router = express.Router();
const bodyParser = require('body-parser')

const itemsRoute = require('./routes/items');
const editItem = require('./routes/editItem')
const addItem = require('./routes/addItem');

app.use(cors());

mongoose.connect('mongodb+srv://nodejs_user:brazil56@test-cluster-pfnua.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Database connected'))


const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

app.use('/api', itemsRoute);



app.use('/addItem', addItem)

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
    console.log('Example app listening on port 5000! Go to https://localhost:5000/')
})

