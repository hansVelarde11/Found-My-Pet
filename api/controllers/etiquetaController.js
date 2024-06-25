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

const getAllPetsByTags = async (req, res) => {
  try {
    const { tags } = req.query

    if(!tags){
      return res.status(400).json({
        status: "error",
        code: 404,
        message: "Se requiere etiquetas a buscar"
      })
    }

    const tagList = tags.split(',')

    //Buscar las estiqueras en base de datos
    const etiquetas = await Etiqueta.findAll({
      where: {
        nombre: {
          [Op.in]: tagList
        }
      },
      include: [{
        model: Mascota,
        as: 'mascotas',
        through: {attributes: []}
      }]
    })

    if(etiquetas.length ===0){
      res.status(404).json({
        status: "error",
        code: 404,
        message: "No se encontraron las etiquetas "
      })
    }

    //extraer las macotas de las etiquetas encontradas
    const mascotas = []
    etiquetas.forEach(etiqueta=>{
      etiqueta.mascotas.forEach(mascota=>{
        if(!mascotas.some(existingMascota => existingMascota.id === mascota.id)) {
          mascotas.push(mascota)
        }
      })
    })

    res.status(200).json({
      status:'success',
      code: 200,
      message: "Mascotas obtenidas correctamente",
      data: mascotas
    })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};//Falta implementar el controller pets
                      
const getAllTags = async (req, res) => {
  try {
    const { page=1,limit=10 } = req.query
    const offset = (page-1)*limit

    //Obtener todas las etiquetas
    const {count,rows} = await Etiqueta.findAndCountAll({
      limit,
      offset,
      attributes:['id','nombre']
    });

    //Calcular el paginado
    const totalPages = Math.ceil(count/limit)
    const hasNextPage = page<totalPages
    const hasPreviousPage = page>1

    //Responder con las etiquetas
    res.status(200).json({ 
      status: "success",
      code: 200,
      message:  "Etiquetas obtenidas correctamente",
      data: {
        tags: rows,
        pageInfo: {
          currentPage: page,
          totalPages: totalPages,
          totalCount: count,
          hasNextPage: hasNextPage,
          hasPreviousPage: hasPreviousPage
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTagByName = async (req, res) => {
  try {
    const { name } = req.params;
    const tag = await Etiqueta.findOne({ where: { nombre: name } });
    if (!tag) {
      return res.status(404).json({ status: "error",
        code: 404,
        message: "Etiqueta no encontrada"
      });
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Etiqueta obetnida correctamente",
      data:  tag
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  register,
  update,
  deleteTag,
  getAllPostsByTag,
  getAllPetsByTags,
  getAllTags,
  getTagByName,
};
