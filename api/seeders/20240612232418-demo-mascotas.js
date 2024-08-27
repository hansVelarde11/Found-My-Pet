'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Mascota', [
      {
        id: '3a01a0a0-5361-46f4-870a-6a7e67764b52',
        user_id: '123e4567-e89b-12d3-a456-426614174000',
        nombre: 'Fido',
        especie: 'Perro',
        raza: 'Labrador',
        color: 'Negro',
        edad: 3,
        sexo: 'Macho',
        descripcion: 'Perro amigable',
        fecha_perdida: '2022-05-01',
        estado: 'Perdido',
        imagen_urls: ['http://example.com/fido.jpg'],
        created_at: new Date(),
      },
      {
        id: '8c5122ac-79a7-4506-8c4d-7b3b721659ae',
        user_id: '98765432-1234-5678-9876-543210987654',
        nombre: 'Whiskers',
        especie: 'Gato',
        raza: 'Siames',
        color: 'Blanco',
        edad: 2,
        sexo: 'Hembra',
        descripcion: 'Gato cariñoso',
        fecha_perdida: '2022-06-01',
        estado: 'Encontrado',
        imagen_urls: ['http://example.com/whiskers.jpg'],
        created_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Mascotas', null, {});
  }
};
