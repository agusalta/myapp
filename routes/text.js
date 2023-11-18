const express = require("express");
const router = express.Router();
const textController = require('../controllers/textController');

router.get("/", textController.getAll);
router.get("/:id", textController.getById);
router.post("/", (req,res,next) => req.app.verifyToken(req, res, next), textController.create);
router.put("/:id", (req,res,next) => req.app.verifyToken(req, res, next),textController.update);
router.patch("/:id", (req,res,next) => req.app.verifyToken(req, res, next),textController.patch); 
router.delete("/:id", (req,res,next) => req.app.verifyToken(req, res, next),textController.deleteJson); 

module.exports = router;