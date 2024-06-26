const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Validaciones
const validateRequest = require('../middlewares/validateRequest')
const { registerSchema } = require('../validation/userValidation/registerSchema')
const { updateSchema } = require('../validation/userValidation/updateSchema')
const { deleteSchema } = require('../validation/userValidation/deleteSchema')
const { getAllUsersSchema } = require('../validation/userValidation/getAllUsersSchema')
const { getPetsByUserSchema } = require('../validation/userValidation/getPetsByUserSchema')
const { getUserByIdSchema } = require('../validation/userValidation/getUserByIdSchema')
const { savePreferencesSchema } = require('../validation/userValidation/savePreferences')


//POST
router.post("/", validateRequest(registerSchema) , userController.register);

//PATCH
router.patch("/:id", validateRequest(updateSchema), userController.update);
router.patch("/:id/settings", validateRequest(savePreferencesSchema) , userController.savePreferences);

//DELETE
router.delete("/:id", validateRequest(deleteSchema), userController.deleteUser);
                 
//GET
router.get("/", validateRequest(getAllUsersSchema), userController.getAllUsers);
router.get('/:id', validateRequest(getUserByIdSchema), userController.getUserById)
router.get('/:id/pets', validateRequest(getPetsByUserSchema),userController.getPetsByUser
)

module.exports = router