const express = require('express');
const cartSchema = require('../model/cartModel');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const cartModel = require("../model/cartModel")

const router = express.Router();

router.use(bodyParser.json());
//const checkAuth = require("../Middleware/check-auth");

router.use(bodyParser.urlencoded({ extended: false }));


router.delete("/:id", (req, res, next) => {
    // console.log(req.param.id);
    // res.status(200).json({
    //     message: "Item deleted successfully"
    // })

    cartModel.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Item deleted!" });
    });


})



router.post('/post', (req, res, next) => {
    console.log("product added");
    var newProduct = new cartSchema({
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

router.post('/mail', (req, res, next) => {


    console.log("inside mail", req.body.mail)
    let transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        service: 'Gmail',

        auth: {
            user: 'sitshopnation@gmail.com', // generated ethereal user
            pass: 'qwerty@123' // generated ethereal password
        }
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: 'sitshopnation@gmail.com', // sender address
        to: req.body.mail, // list of receivers
        subject: "Order placed successfully", // Subject line
        text: "Your order has been successfully placed.Thank You for shopping with us", // plain text body
        // html: "<b>Hello world?</b>" // html body
    }, (err, res) => {
        if (err) {
            console.log("Mail ERROR", err);
        } else {
            console.log("Here is the response of mail", res);
        }
    });

    res.status(201).json({
        message: "Mail successfully sent",


    })

})

router.get('/getProduct', (req, res, next) => {
    cartSchema.find().then(responseData => {
        res.status(200).json({
            message: "Products fetched successfully",
            products: responseData
        })
    })
})


// router.get("/getProductDetails/:id", (req, res, next) => {

//     cartSchema.findById(req.params.id).then(product => {
//         if (product) {
//             res.status(200).json({
//                 message: "Product found successfully",
//                 product: product
//             });
//         } else {
//             res.status(404).json({ message: "Post not found!" });
//         }
//     });
// });



module.exports = router;