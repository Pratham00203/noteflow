const router = require("express").Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// @route    POST api/todo/create
// @desc     Create a todoList
// @access   Private
router.post("/create", auth, async (req, res) => {
  try {
    const { title } = req.body;
    let todo = new Todo({
      userId: req.user.id,
      title: title,
      tasks: [],
    });

    await todo.save();

    return res.status(200).json({ msg: "Todo list created" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    GET api/todo/get/todo/:todoid
// @desc     Get a todo list
// @access   Private
router.get("/get/todo/:todoid", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoid);
    if (!todo) {
      return res.status(400).json({ error: "List not found" });
    }
    return res.status(200).json({ todo });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    GET api/todo/get/todos/all
// @desc     Get todo lists
// @access   Private
router.get("/get/todos/all", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    return res.status(200).json({ todos });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    PUT api/todo/update/todo/:todoid
// @desc     Update todo list
// @access   Private
router.put("/update/todo/:todoid", auth, async (req, res) => {
  try {
    const { title } = req.body;
    await Todo.findByIdAndUpdate(req.params.todoid, {
      title: title,
    });

    return res.status(200).json({ msg: "List updated" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    DELELTE api/todo/delete/todo/:todoid
// @desc     Delete todo list
// @access   Private
router.delete("/delete/todo/:todoid", auth, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.todoid);

    return res.status(200).json({ msg: "List deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
