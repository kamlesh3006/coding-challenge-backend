const {Sequelize,DataTypes} = require('sequelize');
const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestions,
    getQuestionDetails,
  } = require("../controllers/questionsController");
  

router.post("/create", validateToken, createQuestion);
router.put("/update/:questionId",validateToken, updateQuestion);
router.delete("/delete/:questionId", validateToken, deleteQuestion);


  
// Routes for all users
router.get('/getallquestions', getAllQuestions);
router.get('/get_specific_question/:questionId', getQuestionDetails);

module.exports = router;