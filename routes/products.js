const express = require("express");
const router = express.Router();
const productController = require('../controllers/productsController');

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", (req,res,next) => req.app.verifyToken(req, res, next), productController.create);
router.put("/:id", (req,res,next) => req.app.verifyToken(req, res, next),productController.update);
router.patch("/:id", (req,res,next) => req.app.verifyToken(req, res, next),productController.patch); 
router.delete("/:id", (req,res,next) => req.app.verifyToken(req, res, next),productController.deleteJson); 

module.exports = router;