const { Todo } = require('./../models');

exports.createTodo = async (req, res) => {
  const inputData = {
    content: req.body.content,
    author: req.user.id,
    deadline: req.body.deadline
  };

  console.log(inputData);

  const todo = await Todo.create(inputData);

  res.status(201).json({
    message: 'Todo created successfully',
    todo,
  });
};

exports.getAllTodos = async (req, res) => {
  const todos = await Todo.find({ author: req.user.id });

  res.status(200).json({
    message: 'Todos retrieved successfully',
    todos,
  });
};

exports.getTodoById = async (req, res) => {
  const { todoId } = req.params;
  const todo = await Todo.findOne({ _id: todoId, author: req.user.id });

  res.status(200).json({
    message: 'Todo retrieved successfully',
    todo,
  });
};

exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const updateData = {};
  const { content, completed } = req.body;
  if (content) updateData.content = content;
  if (completed !== 'undefined') updateData.completed = completed;

  const todo = await Todo.findOneAndUpdate({ _id: todoId, author: req.user.id }, updateData, { new: true });

  res.status(200).json({
    message: 'Todo updated successfully',
    todo,
  });
};

exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  const deletedTodo = await Todo.findOneAndRemove({ _id: todoId, author: req.user.id });

  res.status(200).json({
    message: 'Todo deleted successfully',
    deletedTodo
  });
};
