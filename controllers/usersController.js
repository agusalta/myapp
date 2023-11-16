const UsersModel = require("../models/usersModel");
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const register = async function(request, response, next) {
    try {
        console.log(request.body)
    
        const user = new UsersModel({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        });
    
        const document = await user.save();
        response.status(201).json(document);
    } catch(e) {
        e.status = 400;
        next(e);
    }
}

const login = async function(request, response, next) {
    try {
        const user = await UsersModel.findOne({ email: request.body.email });

        if(!user) {
            return response.status(401).json({ message: "El email y/o contraseña son incorrectos" });
        }
        
        if(bcrypt.compareSync(request.body.password, user.password)) {
           const token = jsonwebtoken.sign({userId:user._id}, request.app.get("secretKey"), {expiresIn: "1h" })
           return response.json(token)
        } 

        return response.status(401).json({ message: "El email y/o contraseña son incorrectos" });
    } catch(e) {
        next(e)
    }
}

module.exports = {
    register,
    login
};