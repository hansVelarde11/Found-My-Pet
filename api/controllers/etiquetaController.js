const { Op } = require('sequelize');
const { Etiqueta, Post, Mascota } = require('../models');

const register = async (req, res) => {
  try {
    const { nombre } = req.body

    //Verificar si existe etiqueta
    const verifyEtiqueta = await Etiqueta.findOne({ where: { nombre }})
    if(verifyEtiqueta){
      return res.status(400).json({status:"error",
        code: 400,
        message: "La etiqueta ya existe"
      })
    }

    //Crear nueva etiqueta
    const newEtiqueta = await Etiqueta.create({nombre})

    res.status(201).json({
      status:"Success",
      code: 200,
      message: "Etiqueta creada correctamente",
      data: newEtiqueta
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body

    const tag = await Etiqueta.findByPk(id);
    if (!tag) {
      return res.status(404).json({ status: "error",
        code: 404,
        message: "Etiqueta no encontrada"
       });
    }

    // Verificar si el nuevo nombre de la etiqueta ya existe
    const existingTag = await Etiqueta.findOne({ where: { nombre, id: { [Op.ne]: id } } });
    if (existingTag) {
      return res.status(400).json({ status: "error",
        code: 404,
        message: "El nombre de la etiqueta ya existe"
      });
    }

    const updatedTag = await tag.update( { nombre} );
    res.status(200).json({status: "success",
      code: 200,
      message: "Etiqueta actualizada correctamente",
      data: updatedTag
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Etiqueta.findByPk(id);
    if (!tag) {
      return res.status(404).json({ status: "error",
        code: 404,
        message: "Etiqueta no encontrada"
      });
    }

    await tag.destroy();
    res.status(200).json({ status: "success",
      code: 200,
      message: "Etiqueta Eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPostsByTag = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Buscar la etiqueta por su ID incluyendo los posts asociados
    const tag = await Etiqueta.findByPk(id, {
      include: [{ model: Post, as: 'posts', through: { attributes: [] } }], // Asegurarse de no devolver los atributos de la tabla intermedia
    });

    if (!tag) {
      return res.status(404).json({ error: 'Etiqueta no encontrada' });
    }

    // Obtener los posts paginados asociados a la etiqueta
    const posts = await Post.findAndCountAll({
      where: { id: tag.posts.map((post) => post.id), is_active: true }, // Filtrar solo los posts activos asociados a la etiqueta
      limit,
      offset,
      order: [['created_at', 'DESC']], // Ordenar los posts por fecha de creación descendente (o según sea necesario)
    });

    const totalPages = Math.ceil(posts.count / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // Formatear la respuesta
    const response = {
      status: 'success',
      code: 200,
      message: 'Posts obtenidos correctamente por etiqueta',
      data: {
        posts: posts.rows,
        pageInfo: {
          currentPage: page,
          totalPages: totalPages,
          totalCount: posts.count,
          hasNextPage: hasNextPage,
          hasPreviousPage: hasPreviousPage,
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPetsByTag = (req, res) => {};
                      
const getAllTags = (req, res) => {};

const setTagToPost = (req, res) => {};

const setTagToPet = (req, res) => {};

const getTagByName = (req, res) => {};

const unsetTagToPost = (req, res) => {};

const unsetTagToPet = (req, res) => {};

module.exports = {
  register,
  update,
  deleteTag,
  getAllPostsByTag,
  getAllPetsByTag,
  getAllTags,
  setTagToPost,
  setTagToPet,
  getTagByName,
  unsetTagToPet,
  unsetTagToPost,
};
