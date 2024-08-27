const { Post, User, Etiqueta, Comentario } = require("../models");
const { Op } = require("sequelize");

const register = async (req, res) => {
  try {
    const { content, title, tags } = req.body

    //Verificar si las etiquetas existe en BD
    const existingTags = await Promise.all(tags.map(tagName =>{return Etiqueta.findOne({where: {nombre: tagName}})}))

    //Filtrar las etiquetas que no existen y crearlas
    const newTags = tags.filter((tagName, index) => !existingTags[index])
    await Promise.all(newTags.map(tagName=>{
      return Etiqueta.create({nombre: tagName})
    }))

    //Obten todas las etiquetas (existentes y recien creadas)
    const allTags = await Promise.all(tags.map(tagName => {
      return Etiqueta.findOne({where:{nombre: tagName}})
    }))

    //Crear el post
    const newPost = await Post.create({content, title, ...req.body})

    //Asociar etiquetas al post
    await newPost.setEtiquetas(allTags)

    //Response
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Post creado correctamente",
      data: newPost
    })

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }
    const updatedPost = await post.update(req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }
    await post.destroy();
    res.status(200).json({ message: "Post Eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    //Calcular offset para paginado
    const offset = (page - 1) * limit;

    //Realizar la consulta
    const { count, rows } = await Post.findAndCountAll({
      where: { user_id: userId, is_active: true },
      include: [{ model: User, attributes: ["username"] }],
      limit: limit,
      offset: offset,
    });

    //Calcular numero total paginas
    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPreviouspage = page > 1;

    //Objeto de respuesta con paginacion
    const response = {
      status: "success",
      code: 200,
      message: "Posts obtenidos correctamente",
      data: {
        posts: rows,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalCount: count,
          hasNextPage: hasNextPage,
          hasPreviouspage: hasPreviouspage,
        },
      },
    };

    //Respuesta de servidor
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBanPostByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await Post.findAndCountAll({
      where: { user_id: userId, is_active: false },
      include: [{ model: User, attributes: ["username"] }],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;
    const hasPreviouspage = page > 1;

    const response = {
      status: "success",
      code: 200,
      message: "Post baneados obtenidos correctamente",
      data: {
        posts: rows,
        pageInfo: {
          currentPage: page,
          totalPages: totalPages,
          totalCount: count,
          hasNextPage: hasNextPage,
          hasPreviouspage: hasPreviouspage,
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const banPost = async (req, res) => {
  try {
    const { idPost } = req.params;

    //Verificar si el post existe
    const post = await Post.findByPk(idPost);
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }

    //Actualizar el estado del post a bloquear
    await post.update({ is_active: false });

    //Respuesta
    res
      .status(200)
      .json({
        status: "success",
        code: 200,
        message: "Post bloqueado correctamente",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allowPost = async (req, res) => {
  try {
    const { idPost } = req.params;

    //Verificar si el post existe
    const post = await Post.findByPk(idPost);
    if (!post) {
      return res.status(404).json({ error: "Post No encontrado" });
    }

    //Actualizar el estado del post a desbloqueado true
    await post.update({ is_active: true });

    //Respuesta
    res
      .status(200)
      .json({
        status: "success",
        code: 200,
        message: "Post desbloqueado correctamente",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTagsByPost = async (req, res) => {
  try {
    const { idPost } = req.params;

    //Obtener el post con sus etiquetas asociadas
    const post = await Post.findByPk(idPost, {
      include: [{ model: Etiqueta, as: 'etiquetas',attributes:['nombre'] }]
    });

    //Validar si existe el post
    if (!post) {
      return res.status(404).json({ status: "error",
        code: 404,
        message: "Post no encontrado"
       });
    }

    //Extrear solo el nombre de las etiquetas
    const tagNames = post.etiquetas.map(tag=>tag.nombre)

    //Responder con las etiquetas del post
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Etiquetas obtenidas correctamente",
      data: tagNames
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { idPost } = req.params;
    const { page=1, limit=10 } = req.query
    const offset = (page-1)*limit


    const { count, rows } = await Comentario.findAndCountAll({
      where: {post_id: idPost},
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });


    if (rows.length===0) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "No se encontraron comentarios para este post"
      });
    }

    const totalPages = Math.ceil(count/limit)
    const hasNextPage = page<totalPages
    const hasPreviouspage = page>1

    const response = {
      status: "success",
      code: 200,
      message: "Comentarios obtenidos correctamente",
      data: {
        comments: rows,
        pageInfo: {
          currentPage: page,
          totalPages: totalPages,
          totalCount: count,
          hasNextPage: hasNextPage,
          hasPreviouspage: hasPreviouspage
        }
      }
    }


    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const incrementLike = async (req,res) =>{
  try{
    const { idPost } = req.params

    //Buscar el post
    const post = await Post.findByPk(idPost)
    if(!post){ return res.status
      (404).json({status:"error",
        code: 404,
        message: "Post no encontrado"
      })
    }

    //Incrementar el contador de likes
    post.likes_count +=1

    //Guardar en BD
    await post.save()

    //Respuesta
    res.status(200).json({
      status: "success",
      code: 200,
      message:"Like sumado a la cuenta correctamente"
    })
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

const getAll = async (req,res)=>{
  try {
    const { page=1, limit=10 } = req.query
    const offset = (page-1)*limit

    const { count, rows } = await Post.findAndCountAll({limit,offset})

    const totalPages = Math.ceil(count / limit)
    const hasNextPage = page<totalPages
    const hasPreviouspage = page>1

    const response = {
      status: "success",
      code: 200,
      message: "Posts obtenidos correctamente",
      data:{
        posts: rows,
        pagination: {
          currentPage: page,
          totalPages:  totalPages,
          totalCount: count,
          hasNextPage: hasNextPage,
          hasPreviouspage: hasPreviouspage
        }
      }
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

module.exports = {
  getAll,
  register,
  update,
  deletePost,
  getBanPostByUser,
  getPostByUser,
  banPost,
  allowPost,
  getTagsByPost,
  getCommentsByPost,
  incrementLike
};
