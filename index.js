const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
require('dotenv/config')
const cors = require('cors');
const mongoose = require('mongoose')
const router = express.Router();
const bodyParser = require('body-parser')
const compression = require('compression');

const itemsRoute = require('./routes/items');
const editItem = require('./routes/editItem')
const addItem = require('./routes/addItem');
const path = require('path');

const PORT = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('Database connected')).catch(err => console.log(err))

app.use(bodyParser.json())
app.use(cors());

app.use('/api', itemsRoute);
app.use('/addItem', addItem)

if(!dev){
    app.use(express.static(path.resolve(__dirname, 'client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(PORT, () => {
    console.log('App up and running')
  })

