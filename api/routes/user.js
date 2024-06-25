const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//POST
router.post("/", userController.register);

//PATCH
router.patch("/:id", userController.update);
router.patch("/:id/settings", userController.savePreferences);

//DELETE
router.delete("/:id", userController.deleteUser);

//GET
router.get("/", userController.getAllUsers);
router.get('/:id', userController.getUserById)
router.get('/:id/pets', userController.getPetsByUser
)

module.exports = router