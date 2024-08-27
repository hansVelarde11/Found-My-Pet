const { Comentario, Post, User } = require("../models");
const { Op } = require("sequelize");

const register = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.user.id; 

    // Verificar si el post al cual se va a comentar existe
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "El post no existe" });
    }

    // Crear el comentario asociado al post y al usuario
    const newComment = await Comentario.create({
      content,
      post_id: postId,
      user_id: userId,
    });

    // Responder con el comentario recién creado
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Comentario creado correctamente",
      data: newComment,
    });
  } catch (error) {
    // Manejar errores durante la creación del comentario
    res.status(500).json({
      status: "error",
      code: 500,
      message: "No se pudo crear el comentario",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comentario.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    const updatedComment = await comment.update({
      content,
    });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Comentario actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comentario.findByPk(id);
    if (!comment) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Comentario no encontrado",
      });
    }
    await comment.destroy();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Comentario eliminado correcatmente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const ban = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comentario.findByPk(id);
    if (!comment) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Comentario no encontrado",
      });
    }
    const updatedComment = await comment.update({ is_active: false });
    res
      .status(200)
      .json({
        status: "success",
        code: 200,
        message: "Comentario baneado correctamente",
        data: updatedComment
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allcommentsByUser = async (req, res) => {
  try {
    const {id} = req.params
  const { page=1, limit=10} = req.query
  const offset = (page-1)*limit

  const { count,rows } = await Comentario.findAndCountAll({
    where: {user_id: id, is_active:true},
    limit,
    offset,

    order:[['created_at', 'DESC']]
  })

  const totalPages = Math.ceil(count/limit)
  const hasNextPage = page<totalPages
  const hasPreviouspage = page>1

  const response = {
    status: "success",
    code: 200,
    message: "Comentarios obtenidos correctamente",
    data: {
      comments: rows,
      pageInfo:{
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
};

const commentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comentario.findByPk(id);
    if (!comment) {
      return res.status(404).json({
        status: "success",
        code: 200,
        message: "Comentario no existente",
      });
    }
    res.status(200).json({status:"success",
      code: 200,
      message: "Comentario obtenido correctamente",
      data: comment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  update,
  deleteComment,
  ban,
  allcommentsByUser,
  commentById,
};
