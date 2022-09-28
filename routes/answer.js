const answerController = require("../controllers/answer");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/questions/:id/answer", auth, answerController.addAnswer);
router.get("/questions/:id/answer", auth, answerController.getAnswers);
router.put("/answer/:id/upvote", answerController.getUpvote);
router.put("/answer/:id/downvote", answerController.getDownvote);
router.put("/answer/:id/accept", auth, answerController.acceptanswer);


module.exports = router;
