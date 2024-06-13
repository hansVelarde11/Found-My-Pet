const express = require('express');
const { sequelize, Pet } = require('./models'); // Importar sequelize y el modelo Pet desde models/index.js
const app = express();
const port = 3000;

// Middleware
app.use(express.json());


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized');
  }).catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });
});
