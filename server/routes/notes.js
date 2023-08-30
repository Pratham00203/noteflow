const router = require("express").Router();
const User = require("../models/User");
const Note = require("../models/Note");
const auth = require("../middleware/auth");

// @route    POST api/note/create
// @desc     Create a note
// @access   Private
router.post("/create", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    let note = new Note({
      userId: req.user.id,
      title,
      description,
    });

    await note.save();

    return res.status(200).json({ msg: "Note created" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    GET api/note/get/note/:noteid
// @desc     Fetch a note
// @access   Private
router.get("/get/note/:noteid", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteid);

    if (!note) {
      return res.status(400).json({ error: "Note not found" });
    }

    return res.status(200).json({ note });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    GET api/note/get/notes/all
// @desc     Fetch all note
// @access   Private
router.get("/get/notes/all", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ notes });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    PUT api/note/update/:noteid
// @desc     Update a note
// @access   Private
router.put("/update/:noteid", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    await Note.findByIdAndUpdate(req.params.noteid, {
      title: title,
      description: description,
      updatedAt: new Date().toISOString(),
    });

    return res.status(200).json({ msg: "Note updated" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    PUT api/note/pin/:noteid
// @desc     Pin a note
// @access   Private
router.put("/pin/:noteid", auth, async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.noteid, {
      pinned: true,
    });

    return res.status(200).json({ msg: "Note pinned" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    PUT api/note/unpin/:noteid
// @desc     Unpin a note
// @access   Private
router.put("/unpin/:noteid", auth, async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.noteid, {
      pinned: false,
    });

    return res.status(200).json({ msg: "Note unpinned" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    DELETE api/note/delete/:noteid
// @desc     Delete a note
// @access   Private
router.delete("/delete/:noteid", auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.noteid);
    return res.status(200).json({ msg: "Note deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
