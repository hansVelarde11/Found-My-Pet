const express = require("express");
const router = express.Router();
const etiquetaController = require("../controllers/etiquetaController");
const authenticate = require('../middlewares/authenticate')



//GET
router.get("/pets",authenticate,  etiquetaController.getAllPetsByTags);
router.get("/", authenticate, etiquetaController.getAllTags);
router.get("/:id/posts", authenticate,etiquetaController.getAllPostsByTag);
router.get("/:name", authenticate, etiquetaController.getTagByName);

//POST
router.post("/", authenticate, etiquetaController.register);

//PATCH
router.patch("/:id", authenticate, etiquetaController.update);

//DELETE
router.delete("/:id", authenticate,etiquetaController.deleteTag);

module.exports = router