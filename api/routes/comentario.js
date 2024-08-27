const express = require('express')
const router = express.Router()
const comentarioController = require('../controllers/comentarioController')
const authenticate = require('../middlewares/authenticate')



//GET
router.get('/user/:id', authenticate, comentarioController.allcommentsByUser)
router.get('/:id', authenticate, comentarioController.commentById)

//POST
router.post('/:postId/' , authenticate, comentarioController.register)

//PATCH
router.patch('/:id', authenticate, comentarioController.update)
router.patch('/ban/:id', authenticate, comentarioController.ban)

//DELETE
router.delete('/:id', authenticate, comentarioController.deleteComment)

module.exports = router