const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//Validaciones
const validateRequest = require('../middlewares/validateRequest')
const {allowPostSchema} = require('../validation/postValidation/allowPostSchema')
const {banPostSchema} = require('../validation/postValidation/banPostSchema')
const {deletePostSchema} = require('../validation/postValidation/deletePostSchema')
const {getBanPostByUserSchema} = require('../validation/postValidation/getBanPostByUserSchema')
const {getCommentsByPostSchema} = require('../validation/postValidation/getCommentsByPostSchema')
const {getPostByUserSchema} = require('../validation/postValidation/getPostByUserSchema')
const {getTagsByPostSchema} = require('../validation/postValidation/getTagsByPostSchema')
const {incrementLikeSchema} = require('../validation/postValidation/incrementLikeSchema')
const {registerSchema} = require('../validation/postValidation/registerSchema')
const {updateSchema} = require('../validation/postValidation/updateSchema')



//POST
router.post("/", validateRequest(registerSchema), postController.register);

//PATCH
router.patch("/:id", validateRequest(updateSchema), postController.update);
router.put("/ban/:idPost", validateRequest(banPostSchema), postController.banPost);
router.put("/allow/:idPost", validateRequest(allowPostSchema), postController.allowPost);
router.patch("/:idPost/like", validateRequest(incrementLikeSchema), postController.incrementLike)

//DELETE
router.delete("/:id", validateRequest(deletePostSchema), postController.deletePost);

//GET
router.get("/:userId", validateRequest(getPostByUserSchema), postController.getPostByUser);
router.get("/ban/:userId", validateRequest(getBanPostByUserSchema), postController.getBanPostByUser);
router.get("/:idPost/tags", validateRequest(getTagsByPostSchema), postController.getTagsByPost);
router.get("/:idPost/comments", validateRequest(getCommentsByPostSchema), postController.getCommentsByPost);

module.exports = router