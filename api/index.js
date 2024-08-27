const express = require('express');
const { sequelize } = require('./models/index'); // Importar sequelize y el modelo Pet desde models/index.js
const morgan = require('morgan')
const app = express();
const cors = require('cors')
require("dotenv").config()
const port = process.env.PORT;

//IMPORTANDO LAS RUTAS
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const mascotaRoutes = require('./routes/mascota')
const etiquetaRoutes = require('./routes/etiqueta')
const comentarioRoutes = require('./routes/comentario')


// Middleware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"))
app.use('/users', userRoutes)
app.use('/posts',postRoutes)
app.use('/pets',mascotaRoutes)
app.use('/tags',etiquetaRoutes)
app.use('/comments', comentarioRoutes)


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized');
  }).catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });
});
