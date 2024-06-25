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
router.get('/', mascotaController.getAllPets)
router.get('/:id', mascotaController.getPetById)

module.exports = router