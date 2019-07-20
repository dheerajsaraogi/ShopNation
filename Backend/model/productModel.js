const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id: { type: String, requiired: true },
    category: { type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    imagePath: { type: String, required: true}
});

module.exports = mongoose.model("Product", productSchema);
