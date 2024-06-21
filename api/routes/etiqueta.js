const express = require("express");
const router = express.Router();
const etiquetaController = require("../controllers/etiquetaController");

//GET
router.get("/:id/pets", etiquetaController.getAllPetsByTag);
router.get("/", etiquetaController.getAllTags);
router.get("/:id/posts", etiquetaController.getAllPostsByTag);
router.get("/:name", etiquetaController.getTagByName);

//POST
router.post("/", etiquetaController.register);
router.post("/tag/:tagId/post/:postId", etiquetaController.setTagToPost);
router.post("/tag/:tagId/pet/:petId", etiquetaController.setTagToPet);

//PATCH
router.patch("/:id", etiquetaController.update);

//DELETE
router.delete("/:id", etiquetaController.deleteTag);
router.delete("/tag/:tagId/post/:postId", etiquetaController.unsetTagToPost);
router.delete("/tag/:tagId/pet/:petId", etiquetaController.unsetTagToPet);

module.exports = router