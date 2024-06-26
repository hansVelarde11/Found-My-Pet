const express = require('express')
const router = express.Router()
const comentarioController = require('../controllers/comentarioController')

//Validaciones
const validateRequest =  require('../middlewares/validateRequest')
const {banCommentSchema} = require('../validation/comentarioValidation/banCommentSchema')
const {commentByIdSchema} = require('../validation/comentarioValidation/commentByIdSchema') 
const {commentsByUserSchema} = require('../validation/comentarioValidation/commentsByUserSchema')
const {deleteCommentSchema} = require('../validation/comentarioValidation/deleteCommentSchema')
const {registerCommentSchema} = require('../validation/comentarioValidation/registerCommentSchema')
const {updateCommentSchema} = require('../validation/comentarioValidation/updateCommentSchema')

//GET
router.get('/user/:id', validateRequest(commentsByUserSchema), comentarioController.allcommentsByUser)
router.get('/:id', validateRequest(commentByIdSchema), comentarioController.commentById)

//POST
router.post('/:postId/' , validateRequest(registerCommentSchema), comentarioController.register)

//PATCH
router.patch('/:id', validateRequest(updateCommentSchema), comentarioController.update)
router.patch('/ban/:id', validateRequest(banCommentSchema),comentarioController.ban)

//DELETE
router.delete('/:id', validateRequest(deleteCommentSchema), comentarioController.deleteComment)

module.exports = router