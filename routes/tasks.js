const express = require("express");
const router = express();
router.use(express.json());
const task_controller = require("../controller/tasks_controller");

router.get("/", task_controller.findByStatus);
router.put("/:id", task_controller.editOne);
router.post("/", task_controller.addOne);

module.exports = router;