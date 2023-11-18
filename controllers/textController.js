const TextModel = require("../models/textModel");

// POSTMAN QUERY "http://localhost:3000/products?buscar=Camiseta" //

const getAll = async function (request, response, next) {
    try {
        const queryFindTitle = { title: { $regex: `.*${request.query.buscar || ""}.*`, $options: "i" } };

        const products = await TextModel.find(queryFindTitle).populate("category");
        response.json(products)
    } catch (e) {
        next(e)
    }
}

const getById = async function (request, response, next) {
    try {
        const textId = request.params.id; 
        const text = await TextModel.findById(textId);
        
        if (!text) return response.status(404).json({ message: 'Texto no encontrado.' });
        
        response.json(text);
    } catch (e) {
        e.status = 400;
        next(e);
    }
};


const create = async function (request, response, next) {
    try {
        console.log(request.body)

        const text = new TextModel({
            title: request.body.title,
            text: request.body.text,
            category: request.body.category,
        });

        const document = await text.save();
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
        await TextModel.updateOne({ _id: request.params.id })
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
        await TextModel.deleteOne({ _id: request.params.id })
        response.status(204)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAll, getById, create,
    update, patch, deleteJson
};