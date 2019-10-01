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

mongoose.connect(process,env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('Database connected'))


const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())

app.use('/api', itemsRoute);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.use('/addItem', addItem)

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
    console.log('Example app listening on port 5000! Go to https://localhost:5000/')
})

