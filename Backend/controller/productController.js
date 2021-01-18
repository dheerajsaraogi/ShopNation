const express = require('express');
const productSchema = require('../model/productModel');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
const checkAuth = require("../Middleware/check-auth");

router.use(bodyParser.urlencoded({ extended: false }));
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/products');


router.post('/post', (req, res, next) => {
    
    var newProduct = new productSchema({
        id: req.body.id,
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imagePath: req.body.imagePath
    });

    newProduct.save().then(addedProduct => {
        res.status(201).json({
            message: "Product successfully added",
            postId: addedProduct._id,


        })
    })


});

router.get('/getProduct', (req, res, next) => {

    productSchema.aggregate([{
        $group: {
            _id: { category: "$category" },
            ProductSchema: {
                $push: "$$ROOT"
            }
        }
    }], function(err, result) {
        console.log(result)
        res.status(200).json({
            error: err,
            result: result
        })

    })

    // productSchema.find().then(responseData => {
    //     res.status(200).json({
    //         message: "Products fetched successfully",
    //         products: responseData
    //     })
    // })
})

router.get("/getProductDetails/:id", (req, res, next) => {

    productSchema.findById(req.params.id).then(product => {
        if (product) {
            res.status(200).json({
                message: "Product found successfully",
                product: product
            });
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});



module.exports = router;