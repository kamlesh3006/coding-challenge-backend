const { Sequelize ,DataTypes } = require('sequelize');
const asyncHandler = require("express-async-handler")
const db = require('../config/dbconnection.js');
const User = db.user;
const Question = db.question;
const UserProgress = db.userProgress;




const createQuestion = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admins can create questions.' });
    }
  
    // Assuming req.body contains the necessary data for creating a question
    const { problem_statement, description, difficulty, example, testcases } = req.body;
  
    // Create a new question
    const newQuestion = await Question.create({
      problem_statement,
      description,
      difficulty,
      example,
      testcases,
    });
  
    res.status(201).json(newQuestion);
  });
  
const updateQuestion = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admins can update questions.' });
    }
  
    const questionId = req.params.questionId;
  
    // Assuming req.body contains the updated data for the question
    const { problem_statement, description, difficulty, example, testcases } = req.body;
  
    // Find the question by ID
    const question = await Question.findByPk(questionId);
  
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
  
    // Update the question
    await question.update({
      problem_statement,
      description,
      difficulty,
      example,
      testcases,
    });
  
    res.status(200).json(question);
  });
  
const deleteQuestion = asyncHandler(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Only admins can delete questions.' });
    }
  
    const questionId = req.params.questionId;
  
    // Find the question by ID
    const question = await Question.findByPk(questionId);
  
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
  
    // Delete the question
    await question.destroy();
  
    res.status(200).json({ success: true });
});


const getAllQuestions = asyncHandler(async (req, res) => {
    // Fetch all questions from the database
    const questions = await Question.findAll();
    res.status(200).json(questions);
  });
  
const getQuestionDetails = asyncHandler(async (req, res) => {
    const questionId = req.params.questionId;
  
    // Find the question by ID
    const question = await Question.findByPk(questionId);
  
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
  
    res.status(200).json(question);
});
  
  module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getAllQuestions,
    getQuestionDetails,
  };