const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Could not get todos from DB'
    });
  }
});

// @desc    Add a todo
// @route   POST /api/todos
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);

    return res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Could not add your todo to DB'
    });
  }
});

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Public
router.delete('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      deleted: todo
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Could not delete todo from DB'
    });
  }
});

// @desc    Update a todo completed
// @route   PUT /api/todos/:id
// @access  Public
router.patch('/:id', async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        completed: req.body.completed
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Could not toggle completed'
    });
  }
});

// @desc    Delete completed todos
// @route   DELETE /api/todos/
// @access  Public
router.delete('/', async (req, res, next) => {
  try {
    await Todo.deleteMany({ completed: true });

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Could not delete completed todos'
    });
  }
});

module.exports = router;
