const express = require("express");
const router = express.Router();
const etiquetaController = require("../controllers/etiquetaController");

//Validaciones
const validateRequest = require('../middlewares/validateRequest')
const {deleteSchema} = require('../validation/etiquetaValidation/deleteSchema ')
const {getAllPetsByTagsSchema} = require('../validation/etiquetaValidation/getAllPetsByTagsSchema ')
const {getAllPostsByTagSchema} = require('../validation/etiquetaValidation/getAllPostsByTagSchema ')
const {getAllTagsSchema} = require('../validation/etiquetaValidation/getAllTagsSchema ')
const {getTagByNameSchema} = require('../validation/etiquetaValidation/getTagByNameSchema ')
const {registerSchema} = require('../validation/etiquetaValidation/registerSchema')
const {updateSchema} = require('../validation/etiquetaValidation/updateSchema')

//GET
router.get("/pets", validateRequest(getAllPetsByTagsSchema), etiquetaController.getAllPetsByTags);
router.get("/", validateRequest(getAllTagsSchema),etiquetaController.getAllTags);
router.get("/:id/posts", validateRequest(getAllPostsByTagSchema),etiquetaController.getAllPostsByTag);
router.get("/:name", validateRequest(getTagByNameSchema), etiquetaController.getTagByName);

//POST
router.post("/", validateRequest(registerSchema), etiquetaController.register);

//PATCH
router.patch("/:id", validateRequest(updateSchema), etiquetaController.update);

//DELETE
router.delete("/:id", validateRequest(deleteSchema), etiquetaController.deleteTag);

module.exports = router