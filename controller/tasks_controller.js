const knex = require("knex")(require("../knexfile"));

const isValidation = (tasks) => {
    return (
      tasks.title.trim().length !== 0 &&
      tasks.start_date.trim().length !== 0 &&
      tasks.end_date.trim().length !== 0
    );
}

const all = async (_req, res) => {
  try {
    const data = await knex("tasks");
     const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
     data.forEach((task) => {
       task.start_date = new Date(task.start_date).toLocaleString("en-US", {
         timeZone: timezone,
       });
       task.end_date = new Date(task.end_date).toLocaleString("en-US", {
         timeZone: timezone,
       });
     });
     res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Error getting tasks ${error}` });
  }
}

const findByStatus = async (_req, res) => {
    try {
      const data = await knex
        .select("id", "title", "note", "start_date", "end_date")
        .from("tasks")
        .where("status", false);
      if (!data) {
        return res.status(404).json({
          message: `There is no reserved task`,
        });
      }
      // Convert dates to the desired timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      data.forEach((task) => {
        task.start_date = new Date(task.start_date).toLocaleString("en-US", {
          timeZone: timezone,
        });
        task.end_date = new Date(task.end_date).toLocaleString("en-US", {
          timeZone: timezone,
        });
      });
      res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: `Error getting tasks ${error}` });
    }
}

const addOne = async (req, res) => {
  const { body } = req;
  if (!isValidation(body)) {
    throw new Error(`The validation failed`);
  }
  try {
    const [id] = await knex("tasks").insert(body);
    const newTask = await knex("tasks").where("id", id).first();
    if (newTask === 0) {
      res.status(404).json({ message: `Error adding tasks.` });
    }
    return res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: `Error getting tasks ${error}` });
  }
};

// modify the status of the task when it's done
const editOne = async (req, res) => {
    const { status } = req.body;
    try {
        // Update the task status
        const updatedRow = await knex("tasks")
        .where({ id: req.params.id })
        .update({status: status});
        if (updatedRow === 0) {
        return res.status(404).json({
            message: `The task with ${req.params.id} does not exit`,
        });
        }
        const updatedObj = await knex("tasks").where({ id: req.params.id }).first();
        res.json(updatedObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
  addOne,
  editOne,
  findByStatus,
  all
};