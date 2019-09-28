const express = require('express');
const Product = require('../models/Product')
const router = express.Router();

router.get('/', (req, res) => {
    const products = Product.find().then((products) => res.send({ products }))

})

router.patch('/:id', (req, res) => {
    Product.findById(req.params.id).then(product => product.update({ amount: req.body.amount }))
        .then(() => {
            const products = Product.find().then((products) => res.json({ products }))
        })
        .catch(err => console.log(err));
});

module.exports = router;