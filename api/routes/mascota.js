const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')

router.post('/',mascotaController.register)
router.patch('/:id',mascotaController.update)
router.delete(':id',mascotaController.deletePet)
router.get('/:petId/user', mascotaController.getUserByPet)
router.get('/', mascotaController.getAllPets)