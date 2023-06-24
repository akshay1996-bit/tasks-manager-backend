const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const tasksRoutes = require("./controller/tasks");
const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(router);
app.use(cors());
router.get("/", (req, res) => {
  res.status(200).send("Welcome to Task Manager");
});
router.use('/tasks', tasksRoutes);

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
