const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    salary: { type: Number, required: true },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
