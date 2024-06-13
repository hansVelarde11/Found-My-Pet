const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'user_id' });
      User.hasMany(models.Comentario, { foreignKey: 'user_id' });
      User.hasMany(models.Mascota, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      telefono: DataTypes.STRING,
      ciudad: DataTypes.STRING,
      foto_perfil: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      profile_picture_url: DataTypes.TEXT,
      bio: DataTypes.TEXT,
      address: DataTypes.TEXT,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      notification_preferences: DataTypes.JSONB,
      privacy_settings: DataTypes.JSONB,
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      role: { type: DataTypes.STRING, defaultValue: 'user' },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
