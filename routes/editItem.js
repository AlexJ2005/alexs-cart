const express = require('express');
const Product = require('../models/Product')
const router = express.Router();

router.patch('/:id', (req, res) => {
    Product.findById(req.params.id).then((product) => {
        product.update({ amount: req.body.amount });
        res.json({ product })
    });
});


module.exports = router;