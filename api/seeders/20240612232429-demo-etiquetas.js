'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Etiqueta', [
      {
        id: '7b28d837-a66d-4b78-b22b-b61e18aa8e8b',
        nombre: 'Urgente',
        post_ids: [],
        mascota_ids: [],
      },
      {
        id: 'b780eb66-ddd6-48df-a126-1acea691de81',
        nombre: 'Recompensa',
        post_ids: [],
        mascota_ids: [],
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Etiquetas', null, {});
  }
};
