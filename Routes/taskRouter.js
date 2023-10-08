const express = require("express");
const taskRouter = express.Router();
const { taskmodel } = require("../Models/taskmodel");
const { authenticateUser } = require("../Middleware/auth");

// Get all tasks
taskRouter.get("/gettasks", async (req, res) => {
  try {
    const tasks = await taskmodel.find();
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Get task by ID
taskRouter.get("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskmodel.findById(id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Add a new task
taskRouter.post("/addtask", authenticateUser, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = new taskmodel({ title, description, status });
    await newTask.save();
    res.status(201).json({ msg: "Task saved successfully" });
  } catch (error) {
    console.error("Error adding a new task:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Update task by ID
taskRouter.put("/updatetask/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;
    await taskmodel.findByIdAndUpdate(id, updatedTask);
    res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task by ID:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Delete task by ID
taskRouter.delete("/deletetask/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    await taskmodel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task by ID:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = { taskRouter };
