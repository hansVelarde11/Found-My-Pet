const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authenticate = require('../middlewares/authenticate')

//POST
router.post("/", authenticate, postController.register);

//PATCH
router.patch("/:id", authenticate,  postController.update);
router.put("/ban/:idPost", authenticate, postController.banPost);
router.put("/allow/:idPost", authenticate, postController.allowPost);
router.patch("/:idPost/like", authenticate, postController.incrementLike)

//DELETE
router.delete("/:id", authenticate,postController.deletePost);

//GET
router.get("/:userId", authenticate, postController.getPostByUser);
router.get("/ban/:userId",  authenticate,postController.getBanPostByUser);
router.get("/:idPost/tags", authenticate,postController.getTagsByPost);
router.get("/:idPost/comments", authenticate,postController.getCommentsByPost);
router.get("/", postController.getAll)

module.exports = router