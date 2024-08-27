const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require('../middlewares/authenticate')


//LOGIN
router.post("/login", userController.login),

//POST
router.post("/register", userController.register);

//PATCH
router.patch("/:id",authenticate, userController.update);
router.patch("/:id/settings", authenticate, userController.savePreferences);

//DELETE
router.delete("/:id", authenticate, userController.deleteUser);

//GET
router.get("/", authenticate, userController.getAllUsers);
router.get('/:id',authenticate, userController.getUserById)
router.get('/:id/pets', authenticate,userController.getPetsByUser
)

module.exports = router