const answerController = require("../controllers/answer");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/questions/:id/answer", auth, answerController.addAnswer);
router.get("/questions/:id/answer", auth, answerController.getAnswers);
router.put("/:id/upvote", answerController.getUpvote);
router.put("/:id/downvote", answerController.getDownvote);
router.put("/:id/accept", auth, answerController.acceptanswer);


module.exports = router;
