'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comentarios', [
      {
        id: 'e52bbbf9-8d81-4b47-aa1b-5633a986e469',
        post_id: 'cc12888c-67b0-43d0-824f-c25f877420d2',
        user_id: '98765432-1234-5678-9876-543210987654',
        content: 'Comment on post 1 by user 2',
        is_active: true,
        created_at: new Date(),
      },
      {
        id: '507423b8-0e26-4f89-8a71-bac629728973',
        post_id: '4bb873e2-6a04-4ecc-8032-b20103a31a31',
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Comment on post 2 by user 1',
        is_active: true,
        created_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comentarios', null, {});
  }
};
