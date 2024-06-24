const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')

//POST
router.post('/',mascotaController.register)

//PATCH
router.patch('/:id',mascotaController.update)

//DELETE
router.delete('/:id',mascotaController.deletePet)

//GET
router.get('/:petId/user', mascotaController.getUserByPet)
router.get('/', mascotaController.getAllPets)

module.exports = router