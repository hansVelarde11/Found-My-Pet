const express = require('express')
const router = express.Router()
const mascotaController = require('../controllers/mascotaController')

//Validaciones
const validateRequest = require('../middlewares/validateRequest')
const {deletePetSchema}=require('../validation/mascotaValidation/deletePetSchema')
const {getAllPetsSchema}=require('../validation/mascotaValidation/getAllPetsSchema')
const {getPetByIdSchema}=require('../validation/mascotaValidation/getPetByIdSchema')
const {registerSchema}=require('../validation/mascotaValidation/registerSchema')
const {updateSchema}=require('../validation/mascotaValidation/updateSchema')

//POST
router.post('/', validateRequest(registerSchema),mascotaController.register)

//PATCH
router.patch('/:id', validateRequest(updateSchema), mascotaController.update)

//DELETE
router.delete('/:id', validateRequest(deletePetSchema), mascotaController.deletePet)

//GET
router.get('/', validateRequest(getAllPetsSchema), mascotaController.getAllPets)
router.get('/:id', validateRequest(getPetByIdSchema), mascotaController.getPetById)

module.exports = router