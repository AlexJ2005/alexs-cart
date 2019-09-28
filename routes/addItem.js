const express = require('express');
const Product = require('../models/Product')
const router = express.Router();


router.post('/', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount
    });

    newProduct.save().then(product => res.json(product))



});

module.exports = router;

