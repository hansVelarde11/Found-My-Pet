const { Mascota, User, Etiqueta } = require('../models');
const { Op } = require('sequelize');

// Registrar una nueva mascota
const register = async (req, res) => {
  try {
    const { etiquetas } = req.body

    //Post de nueva mascota
    const newPet = await Mascota.create(req.body);

    //Manejo de etiquetas proporcionadas en body
    if(etiquetas && etiquetas.length > 0){
      //Buscar o crear etiquetas luego ascociar a la nueva mascota
      const etiquetaInstances = await Promise.all(etiquetas.map(async (etiqueta)=>{
        const [etiquetaInstance] = await Etiqueta.findOrCreate({where: {nombre:etiqueta}})
        return etiquetaInstance
      }))
      await newPet.setEtiquetas(etiquetaInstances)
    }

    //Respuesta 
    res.status(201).json({
      status: "success",
      code: 200,
      message: "Mascota registrada correctamente",
      data: newPet
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { etiquetas, ...rest } = req.body

    const pet = await Mascota.findByPk(id);
    if (!pet) {
      return res.status(404).json({ status: "error",
        code: 404,
        message: "Mascota no encontrada"
       });
    }

    //Actualizar la info de pet con la informacion restante
    const updatedPet = await pet.update(rest);

    //Si hay etiquetas se debe manejarlas
    if(etiquetas && etiquetas.length>0){
      //Buscar o crear
      const etiquetaInstances = await Promise.all(etiquetas.map(async (tagName)=>{
        const [tag,created] = await Etiqueta.findOrCreate({where: {nombre: tagName}})
        return tag
      }))

      //Asociar las etiquetas
      await updatedPet.setEtiquetas(etiquetaInstances)
    }

    //Response con etiquetas
    const petWithTags = await Mascota.findByPk(id,{include:[{model: Etiqueta, as:'etiquetas', attributes:['nombre']}]})

    //Respuesta
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Mascota actualizada corectamente",
      data: petWithTags
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const { id } = req.params

    const  pet = await Mascota.findByPk(id)

    if(!pet){
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Mascota no encontrada"
      })
    }

    await pet.destroy()

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Mascota eliminada correctamente"
    })

  } catch (error) {
    res.status(500).json({error: error})
  }
};

const getAllPets = async (req,res)=>{
  try {
    const { page=1,limit=10 } = req.query
    const offset = (page-1)*limit

    const { count,rows } = await Mascota.findAndCountAll({
      limit,
      offset,
      order:[['created_at', 'DESC']]
    })

    const totalPages = Math.ceil(count/limit)
    const hasNextPage = page>totalPages
    const hasPreviouspage = page>1

    const response = {
      status: "success",
      code: 200,
      message: "Mascotas obtenidas correctamente",
      data: {
        pets: rows,
        pageInfo: {
          currentPage: page,
          totalPages: totalPages,
          totalCount: count,
          hasNextPage: hasNextPage,
          hasPreviouspage: hasPreviouspage
        }
      }

    }

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getPetById = async (req,res)=>{
  try {
    const { id } = req.params

    const pet = await Mascota.findByPk(id)

    if(!pet){
      res.status(404).json({
        status: 'error',
        code: 404,
        message: "Mascota no encontrada"
      })
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: 'Mascota obtenida correctamente',
      data: pet
    })
  } catch (error) {
    res.status(500).json({ error: error.message})
  }
}

module.exports = {
  deletePet,
  getAllPets,
  register,
  update,
  getPetById
};
