/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex("tasks").insert([
    {
      id: 1,
      title: "capstone project",
      note: "finish tasks function",
      status: false,
    },
    {
      id: 2,
      title: "submit capstone project",
      note: "finish entire functions",
      status: false,
      start_date: new Date("2024-02-25T08:00:00"),
      end_date: new Date("2024-02-25T23:59:59"),
    },
    {
      id: 3,
      title: "Presentation",
      status: false,
      start_date: new Date("2024-02-26T10:00:00"),
      end_date: new Date("2024-02-26T13:00:00"),
    },
  ]);
};
