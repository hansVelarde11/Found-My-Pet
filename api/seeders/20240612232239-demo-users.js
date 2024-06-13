'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        username: 'user1',
        email: 'user1@example.com',
        password: 'password1',
        fecha_registro: new Date(),
        telefono: '123456789',
        ciudad: 'Lima',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '123456789',
        date_of_birth: '1990-01-01',
        profile_picture_url: 'http://example.com/user1.jpg',
        bio: 'Bio of user1',
        address: '123 Main St',
        city: 'Lima',
        state: 'Lima',
        is_active: true,
        role: 'user',
        created_at: new Date(),
      },
      {
        id: '98765432-1234-5678-9876-543210987654',
        username: 'user2',
        email: 'user2@example.com',
        password: 'password2',
        fecha_registro: new Date(),
        telefono: '987654321',
        ciudad: 'Arequipa',
        first_name: 'Jane',
        last_name: 'Doe',
        phone_number: '987654321',
        date_of_birth: '1992-02-02',
        profile_picture_url: 'http://example.com/user2.jpg',
        bio: 'Bio of user2',
        address: '456 Main St',
        city: 'Arequipa',
        state: 'Arequipa',
        is_active: true,
        role: 'admin',
        created_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
