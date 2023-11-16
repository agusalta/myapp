const categoryModel = require("../models/categoriesModel.js")

module.exports = {
    getAll: async function(request, response, next) {
        try{
            const products = await categoryModel.find()
            response.json(products)
        } catch(e) {
            next(e)
        }
    },

    create: async function(req, res, next) {
        try {
            console.log(req.body)
            console.log(req.body.name)
        
            const document = new categoryModel({
               name: req.body.name
            });
        
            const response = await document.save();
            res.json(response)
        } catch(e) {
            // e.status = 400;
            next(e);
        }
    }
}