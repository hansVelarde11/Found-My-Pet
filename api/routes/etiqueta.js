const express = require("express");
const router = express.Router();
const etiquetaController = require("../controllers/etiquetaController");

//GET
router.get("/pets", etiquetaController.getAllPetsByTags);
router.get("/", etiquetaController.getAllTags);
router.get("/:id/posts", etiquetaController.getAllPostsByTag);
router.get("/:name", etiquetaController.getTagByName);

//POST
router.post("/", etiquetaController.register);

//PATCH
router.patch("/:id", etiquetaController.update);

//DELETE
router.delete("/:id", etiquetaController.deleteTag);

module.exports = router