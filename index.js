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
    .then(() => console.log('Database connected'))




app.use(bodyParser.json())
app.use(cors());

app.use('/api', itemsRoute);
app.use('/addItem', addItem)

if(!dev){
    app.disable('x-powered-by');
    app.use(compression());
    
    app.use(express.static(path.resolve(__dirname, 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}



app.listen(PORT, () => console.log('Server up and running'))

