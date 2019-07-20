const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    id: { type: String, required: false },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Cart", cartSchema);