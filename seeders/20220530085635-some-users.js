"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Karla",
          email: "k@k.com",
          password: "k",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Matias",
          email: "m@m.com",
          password: "m",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Swen",
          email: "s@s.com",
          password: "s",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
