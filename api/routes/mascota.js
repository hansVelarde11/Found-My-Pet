const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')
const authenticate = require('../middlewares/authenticate')



//POST
router.post('/', authenticate, mascotaController.register)

//PATCH
router.patch('/:id', authenticate, mascotaController.update)

//DELETE
router.delete('/:id',  authenticate,mascotaController.deletePet)

//GET
router.get('/',  authenticate,mascotaController.getAllPets)
router.get('/:id', authenticate, mascotaController.getPetById)

module.exports = router