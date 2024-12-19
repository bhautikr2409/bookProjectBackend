const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Products = mongoose.model("ecom", dataSchema);

module.exports = Products;
