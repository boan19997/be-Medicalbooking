'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com.com',
      password: '123456',
      firstName: 'Nguyen',
      lastName: 'Dat',
      address: 'HCM',
      phonenumber: '1223',
      gender: '1',
      roleId: 'admin',
      image: 'R1',
      positionId: '2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
