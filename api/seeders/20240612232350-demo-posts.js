'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        id: 'cc12888c-67b0-43d0-824f-c25f877420d2',
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        content: 'Content of post 1',
        title: 'Title of post 1',
        image_urls: ['http://example.com/post1.jpg'],
        latitude: -12.0464,
        longitude: -77.0428,
        tags: ['tag1', 'tag2'],
        visibility: 'public',
        is_active: true,
        created_at: new Date(),
      },
      {
        id: '4bb873e2-6a04-4ecc-8032-b20103a31a31',
        user_id: '98765432-1234-5678-9876-543210987654',
        content: 'Content of post 2',
        title: 'Title of post 2',
        image_urls: ['http://example.com/post2.jpg'],
        latitude: -16.4090,
        longitude: -71.5375,
        tags: ['tag3', 'tag4'],
        visibility: 'private',
        is_active: true,
        created_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
