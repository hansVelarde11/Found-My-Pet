const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Validaciones
const validateRequest = require('../middlewares/validateRequest')
const { registerSchema } = require('../validation/userValidation/registerSchema')
const { updateSchema } = require('../validation/userValidation/updateSchema')

//POST
router.post("/", validateRequest(registerSchema) , userController.register);

//PATCH
router.patch("/:id", validateRequest(updateSchema), userController.update);
router.patch("/:id/settings", userController.savePreferences);

//DELETE
router.delete("/:id", userController.deleteUser);

//GET
router.get("/", userController.getAllUsers);
router.get('/:id', userController.getUserById)
router.get('/:id/pets', userController.getPetsByUser
)

module.exports = router