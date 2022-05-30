"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "todoLists",
      [
        {
          title: "Personal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Work",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hobbies",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("todoLists", null, {});
  },
};
