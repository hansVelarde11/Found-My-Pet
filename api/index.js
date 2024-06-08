const express = require('express');
const { sequelize, Pet } = require('./models'); // Importar sequelize y el modelo Pet desde models/index.js
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Rutas CRUD
app.post('/pets', async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/pets/:id', async (req, res) => {
  try {
    const [updated] = await Pet.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPet = await Pet.findByPk(req.params.id);
      res.json(updatedPet);
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/pets/:id', async (req, res) => {
  try {
    const deleted = await Pet.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Pet deleted' });
    } else {
      res.status(404).json({ error: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  sequelize.sync({ force: false }).then(() => {
    console.log('Database synchronized');
  }).catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });
});
