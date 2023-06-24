const taskRoutes = require("express").Router();
const tasksData = require("../taskData.json");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4, validate } = require("uuid");
const path = require("path");
const validator = require("../helpers/validator");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get("/", (req, res) => {
  res.status(200).send(tasksData);
});

taskRoutes.get("/:id", (req, res) => {
  const id = req.params.id;
  if (validator.validateId(id, tasksData.tasks)) {
    const reqData = tasksData.tasks.filter((data) => data.id == id);
    res.status(200).send(reqData);
  } else {
    res.status(400).send("Id doesn't exist");
  }
});

taskRoutes.post("/", (req, res) => {
  const newTasks = req.body;
  const pathName = path.join(__dirname, "..", "taskData.json");
  const modifiedTasks = tasksData;
  if (validator.validTaskData(newTasks).status) {
    modifiedTasks.tasks.push({ id: uuidv4(), ...newTasks });
    fs.writeFileSync(pathName, JSON.stringify(modifiedTasks), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(201).send("Task Added Successfully");
  } else {
    res.status(400).json(validator.validTaskData(newTasks));
  }
});

taskRoutes.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;
  if (validator.validateId(id, tasksData.tasks)) {
    if (validator.validTaskData(updatedTask).status) {
      const index = tasksData.tasks.findIndex((item) => item.id == id);
      const pathName = path.join(__dirname, "..", "taskData.json");
      const modifiedTasks = tasksData;
      modifiedTasks.tasks.splice(index, 1, { id, ...updatedTask });
      fs.writeFileSync(pathName, JSON.stringify(modifiedTasks), {
        encoding: "utf-8",
        flag: "w",
      });
      res.status(200).send("Updated successfully");
    } else {
      res.status(400).json(validator.validTaskData(updatedTask));
    }
  } else {
    res.status(400).send("ID doesn't exist");
  }
});

taskRoutes.delete("/:id", (req, res) => {
  let id = req.params.id;
  let pathName = path.join(__dirname, "..", "taskData.json");
  if (validator.validateId(id, tasksData.tasks)) {
    let modifiedTask = tasksData.tasks.filter((item) => item.id != id);
    fs.writeFileSync(pathName, JSON.stringify({ tasks: modifiedTask }), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send("Delete Successfully");
  } else {
    res.status(400).send("Id doesn't exist");
  }
});

taskRoutes.get("/priority/:priority", (req, res) => {
  const priority = req.params.priority;
  if (validator.isValidPriority(priority)) {
    const filteredTask = tasksData.tasks.filter(
      (item) => item.priority == priority
    );
    res.status(200).send(filteredTask);
  } else {
    res.status(400).send("Invalid priority value");
  }
});

module.exports = taskRoutes;
