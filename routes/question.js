const questionController = require("../controllers/question");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/", auth, questionController.addQuestion);
router.get("/", auth, questionController.getQuestions);
router.get("/userquestions", auth, questionController.getUserquestions);
router.get("/:id", auth, questionController.getOneQuestion);
router.delete("/:id", auth, questionController.deleteQuestion);

module.exports = router;
