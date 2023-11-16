const mongoose = require("../config/mongodb");
const bcrypt = require("bcrypt");
const {isPasswordSecure} = require("../utils/validators");

const mainSchema = mongoose.Schema({
    name: String, 
    email: String, 
    password:  {
        type: String,
        validate: {
            validator: isPasswordSecure,
            message: "El {PATH} debe contener al menos una letra, 1 minuscula, 1 mayuscula",
        }
    }
})

mainSchema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next()
})

const UsersModel = mongoose.model("users", mainSchema)

module.exports = UsersModel;