const express = require("express");
const router = express();
const knex = require("knex")(require("../knexfile"));

const getTasks = async (req, res) => {
    try {
        const data = await knex("tasks");
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error: ${error}`);
    }
};
router.get("/", getTasks)

module.exports = router;