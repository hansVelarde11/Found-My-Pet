const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    static associate(models) {
      Comentario.belongsTo(models.Post, { foreignKey: 'post_id' });
      Comentario.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Comentario.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      post_id: { type: DataTypes.UUID, allowNull: false },
      user_id: { type: DataTypes.UUID, allowNull: false },
      content: DataTypes.TEXT,
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      sequelize,
      modelName: "Comentario",
      timestamps: false,
    }
  );
  return Comentario;
};
