const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//POST
router.post("/", postController.register);

//PATCH
router.patch("/:id", postController.update);
router.put("/ban/:idPost", postController.banPost);
router.put("/allow/:idPost", postController.allowPost);
router.patch("/:idPost/like", postController.incrementLike)

//DELETE
router.delete("/:id", postController.deletePost);

//GET
router.get("/:userId", postController.getPostByUser);
router.get("/ban/:userId", postController.getBanPostByUser);
router.get("/:idPost/tags", postController.getTagsByPost);
router.get("/:idPost/comments", postController.getCommentsByPost);

module.exports = router