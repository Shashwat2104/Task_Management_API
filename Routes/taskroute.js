const express = require("express");
const taskroute = express.Router();
const { taskmodel } = require("../Models/taskmodel");
const { auth } = require("../Middleware/auth");

// Get all tasks
taskroute.get("/gettask", async (req, res) => {
  try {
    const data = await taskmodel.find();
    res.status(200).json({ msg: data });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Get task by ID
taskroute.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await taskmodel.findById(id);
    if (!data) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json({ msg: data });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Add a new task
taskroute.post("/addtask", auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const data = new taskmodel({ title, description, status });
    await data.save();
    res.status(201).json({ msg: "Task saved successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Update task by ID
taskroute.put("/updatetask/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await taskmodel.findByIdAndUpdate(id, data);
    res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Delete task by ID
taskroute.delete("/deletetask/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await taskmodel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = { taskroute };
