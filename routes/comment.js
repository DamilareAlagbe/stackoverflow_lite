const commentController = require("../controllers/comment");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/answer/:id/comment", auth, commentController.addComment);
router.get("/answer/:id/comments",auth, commentController.getComments);
router.delete("/comment/:id",auth, commentController.deleteComment);

module.exports = router;
