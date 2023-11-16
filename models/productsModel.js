const mongoose = require("../config/mongodb");

const productSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: [true, "El campo es requerido"],
        minLength: [3, "Debe ingresar al menos 3 caracteres"]
    },

    price: {
        type: Number,
        required: [true, "El campo es requerido"],
        min: [0, "Debe ingresar un campo mayor a cero"],
    },

    description: String,

    quantity: {
        type: Number,
        required: [true, "El campo es requerido"],
        min: [1, "Debe ingresar por lo menos un producto"],
    },
    
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories",
    }
})

productSchema.virtual("price_currency").get(function() {
    return `$ ${this.price} ARS`
})

productSchema.set("toJson", {getters:true, setters:true, virtuals: true})
const productModel = mongoose.model("products", productSchema)

module.exports = productModel;