const { User } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    // Validar si email ya se utilizó
    const { email, password, date_of_birth } = req.body;
    const verifyEmail = await User.findOne({ where: { email } });
    if (verifyEmail) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    //Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lógica para registrar un nuevo usuario
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    //Eliminar campo contraseña de la respuesta
    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    //Respuesta exitosa
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const {
      username,
      email,
      telefono,
      ciudad,
      foto_perfil,
      first_name,
      last_name,
      phone_number,
      date_of_birth,
      profile_picture_url,
      bio,
      address,
      city,
      state,
      notification_preferences,
      privacy_settings,
      is_active,
      role,
    } = req.body;
    const { id } = req.params;

    // Validar si User existe para actualizar
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario No encontrado" });
    }

    user = await user.update({
      username,
      email,
      telefono,
      ciudad,
      foto_perfil,
      first_name,
      last_name,
      phone_number,
      date_of_birth,
      profile_picture_url,
      bio,
      address,
      city,
      state,
      notification_preferences,
      privacy_settings,
      is_active,
      role,
    });

    //Eliminar password de la respuesta a devolver
    const { password, ...updateUser } = user.toJSON();

    //Enviando respuesta
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Validar si User existe para actualizar
    let user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ error: "Usuario No encontrado" });
    }

    await user.destroy();
    return res.status(200).json({ message: "Usuario Eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const {
    username,
    email,
    ciudad,
    first_name,
    last_name,
    phone_number,
    address,
    city,
    state,
    is_active,
    role,
    notification_preferences,
    privacy_settings,
    page=1,
    limit=10
  } = req.query;

  try {
    //clausula dinamica para filtros conbinados
    let whereClause = {};

    //Construccion de la clausula dinamica
    if (username) whereClause.username = { [Op.like]: `%${username}%` };
    if (email) whereClause.email = { [Op.like]: `%${email}%` };
    if (ciudad) whereClause.ciudad = { [Op.like]: `%${ciudad}%` };
    if (first_name) whereClause.first_name = { [Op.like]: `%${first_name}%` };
    if (last_name) whereClause.last_name = { [Op.like]: `%${last_name}%` };
    if (phone_number)
      whereClause.phone_number = { [Op.like]: `%${phone_number}%` };
    if (address) whereClause.address = { [Op.like]: `%${address}%` };
    if (city) whereClause.city = { [Op.like]: `%${city}%` };
    if (state) whereClause.state = { [Op.like]: `%${state}%` };
    if (is_active) whereClause.is_active = { [Op.like]: `%${is_active}%` };
    if (role) whereClause.role = { [Op.like]: `%${role}%` };
    if (notification_preferences) {
      whereClause.notification_preferences = {
        [Op.contains]: JSON.parse(notification_preferences),
      };
    }
    if (privacy_settings) {
      whereClause.privacy_settings = {
        [Op.contains]: JSON.parse(privacy_settings),
      };
    }

    //Calculalr el offset para el paginado
    const offset = (page-1)*limit

    //Consulta en BD
    const users = await User.findAll({ where: whereClause, limit: limit, offset: offset });

    //Calcular numero total de usuarios por pagina
    const totalCount = await User.count({ where: whereClause })
    const totalPages = Math.ceil(totalCount/limit)

    //Preparar response con data y paginacion
    const response = {
      data: users,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        hasNextPage: page < totalPages
      }
    }


    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const savePreferences = async (req, res) => {
  const { id } = req.params;
  const { notification_preferences, privacy_settings } = req.body;

  try {
    //Verificar si usuario existe y traerlo
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario No encontrado" });
    }

    //Actualizar solo los valores que entraron a la solicitud
    const updateFields = {}
    if(notification_preferences) updateFields.notification_preferences = notification_preferences
    if(privacy_settings) updateFields.privacy_settings = privacy_settings

    await user.update(updateFields)

    res.status(200).json({ message: "Preferencias guardadas correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    //Verificar si usuario existe y traerlo
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario No encontrado" });
    }

    return res.status(200).json({data: user});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  update,
  deleteUser,
  getAllUsers,
  savePreferences,
  getUserById,
};
