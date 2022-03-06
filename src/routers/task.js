const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["taskDescription", "completed"];
  const isUpdateValid = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isUpdateValid) {
    return res.status(400).send({ error: "Invalid update" });
  }

  try {
    const taskForUpdate = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!taskForUpdate) {
      return res.status(404).send();
    }

    res.send(taskForUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const taskForDelete = await Task.findByIdAndDelete(_id);

    if (!taskForDelete) {
      return res.status(404).send();
    }

    res.send(taskForDelete);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
