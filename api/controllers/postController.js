const { Post, User, Etiqueta, Comentario } = require("../models");
const { Op } = require("sequelize");

const register = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
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
    const { userId, page=1, limit=10 } = req.params;

    //Calcular offset para paginado
    const offset= (page-1)*limit

    //Realizar la consulta
    const { count, rows } = await Post.findAndCountAll({
      where: { user_id: userId, is_active: true },
      include: [{ model: User, attributes: ['username'] }],
      limit: limit,
      offset: offset
    });

    //Calcular numero total paginas
    const totalPages = Math.ceil(count / limit)
    const hasNextPage = page < totalPages
    const hasPreviouspage = page >1

    //Objeto de respuesta con paginacion
    const response = {
      status: "success",
      code: 200,
      message: "Posts obtenidos correctamente",
      data:{
        posts: rows,
        pagination:{
          currentPage: page,
          totalPages: totalPages,
          totalCount: count,
          hasNextPage: hasNextPage,
          hasPreviouspage: hasPreviouspage
        }
      }
    }

    //Respuesta de servidor
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBanPostByUser = (req, res) => {};

const banPost = (req, res) => {};

const allowPost = (req, res) => {};

const getTagsByPost = (req, res) => {};

const getCommentsByPost = (req, res) => {};

module.exports = {
  register,
  update,
  deletePost,
  getBanPostByUser,
  getPostByUser,
  banPost,
  allowPost,
  getTagsByPost,
  getCommentsByPost,
};
