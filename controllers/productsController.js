const ProductsModel = require("../models/productsModel");

// POSTMAN QUERY "http://localhost:3000/products?buscar=Camiseta" //

const getAll = async function (request, response, next) {
    try {
        const queryFindTitle = { title: { $regex: `.*${request.query.buscar || ""}.*`, $options: "i" } };

        const products = await ProductsModel.find(queryFindTitle).populate("category");
        response.json(products)
    } catch (e) {
        next(e)
    }
}

const getById = async function (request, response, next) {
    try {
        const productId = request.params.id; 
        const product = await ProductsModel.findById(productId);
        
        if (!product) return response.status(404).json({ message: 'Producto no encontrado.' });
        
        response.json(product);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};


const create = async function (request, response, next) {
    try {
        console.log(request.body)

        const products = new ProductsModel({
            title: request.body.title,
            price: request.body.price,
            description: request.body.description,
            quantity: request.body.quantity,
            category: request.body.category,
        });

        const document = await products.save();
        response.status(201).json(document);
    } catch (e) {
        e.status = 400;
        next(e);
    }
}

const update = async function (request, response, next) {
    console.log(request.params.id)
    console.log(request.body)

    try {
        await ProductsModel.updateOne({ _id: request.params.id })
        response.status(204)
    } catch (e) {
        next(e)
    }

}

const patch = function (request, response, next) {
    console.log(request.params.id)
    console.log(request.body)

    response.json(request.body)
}

const deleteJson = async function (request, response, next) {
    console.log(request.params.id)

    try {
        await ProductsModel.deleteOne({ _id: request.params.id })
        response.status(204)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAll, getById, create,
    update, patch, deleteJson
};