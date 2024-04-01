const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    code: String,
    brand: String,
    price: Number,
    product_unit: Number,
    in_stock: Number,
})

const ProductModel = mongoose.model('products', ProductSchema)

module.exports = ProductModel;