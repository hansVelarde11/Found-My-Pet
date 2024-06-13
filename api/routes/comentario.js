const express = require('express')
const router = express.Router()
const comentarioController = require('../controllers/comentarioController')

//GET
router.get('/post/:id', comentarioController.allcommentsByPost)
router.get('/user/:id', comentarioController.allcommentsByUser)
router.get('/:id', comentarioController.commentById)

//POST
router.post('/' , comentarioController.register)

//PATCH
router.patch('/:id', comentarioController.update)
router.patch('/ban/:id', comentarioController.ban)

//DELETE
router.delete('/:id', comentarioController.deleteComment)
