const router = require("express").Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// @route    POST api/todos/task/create/:todoid
// @desc     Create a task
// @access   Private
router.post("/create/:todoid", auth, async (req, res) => {
  try {
    const { description } = req.body;

    let todo = await Todo.findById(req.params.todoid);

    todo.tasks.push({
      description: description,
    });

    await todo.save();

    return res.status(200).json({ msg: "Task added" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    GET api/todos/task/get/:todoid/:taskid
// @desc     Get a task
// @access   Private
router.get("/get/:todoid/:taskid", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoid);

    let task = todo.tasks.find((t) => t.id === req.params.taskid);

    return res.status(200).json({ task });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    PUT api/todos/task/update/:todoid/:taskid
// @desc     Update a task
// @access   Private
router.put("/update/:todoid/:taskid", auth, async (req, res) => {
  try {
    const { description, status } = req.body;
    const todo = await Todo.findById(req.params.todoid);
    let taskIndex = todo.tasks.findIndex((t) => t.id === req.params.taskid);

    todo.tasks[taskIndex] = { description, status };

    await todo.save();
    return res.status(200).json({ msg: "Task updated" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    DELETE api/todos/task/delete/:todoid/:taskid
// @desc     Delete a task
// @access   Private
router.delete("/delete/:todoid/:taskid", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoid);
    let taskIndex = todo.tasks.findIndex((t) => t.id === req.params.taskid);
    console.log(taskIndex);

    todo.tasks.splice(taskIndex, 1);

    await  todo.save();
    return res.status(200).json({ msg: "Task deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
