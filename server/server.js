const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/db");

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send(`Server running..`);
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/notes"));
app.use("/api/user", require("./routes/users"));
app.use("/api/todo", require("./routes/todos"));
app.use("/api/todos/task", require("./routes/tasks"));

app.listen(process.env.PORT, () => {
  console.log(`Server running at PORT ${process.env.PORT}`);
});
