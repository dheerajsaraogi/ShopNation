const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const authcontroller = require('../controller/authController');
const productController = require('../controller/productController');
const cartController = require('../controller/cartController');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next();
});

app.use('/auth', authcontroller);
app.use('/products', productController);
app.use('/cart', cartController);
app.get('/', (req, res, next) => {
    res.status(200).json({
        name: 'E-commerce: ShopNation'
    })
})

module.exports = app;