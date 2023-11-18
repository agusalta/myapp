const mongoose = require("../config/mongodb");

const textSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: [true, "El campo es requerido"],
        minLength: [3, "Debe ingresar al menos 3 caracteres"]
    },

    text: {
        type: String,
        required: [true, "El campo es requerido"],
        min: [0, "Debe ingresar un campo mayor a cero"],
    },
    
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "categories",
    }
})

textSchema.set("toJson", {getters:true, setters:true, virtuals: true})
const textModel = mongoose.model("text", textSchema)

module.exports = textModel;