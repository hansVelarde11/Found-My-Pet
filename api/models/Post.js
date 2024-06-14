const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'user_id' });
      Post.hasMany(models.Comentario, { foreignKey: 'post_id' });
      Post.belongsToMany(models.Etiqueta,{through: "EtiquetaPost", foreignKey: "postId", as: "etiquetas"})
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: { type: DataTypes.UUID, allowNull: false },
      content: DataTypes.TEXT,
      title: DataTypes.STRING,
      image_urls: DataTypes.ARRAY(DataTypes.TEXT),
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      tags: DataTypes.ARRAY(DataTypes.TEXT),
      visibility: DataTypes.STRING,
      comments_ids: DataTypes.ARRAY(DataTypes.UUID),
      likes_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      comments_count: { type: DataTypes.INTEGER, defaultValue: 0 },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      updated_at: DataTypes.DATE,
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      sequelize,
      modelName: "Post",
      timestamps: false,
    }
  );
  return Post;
};
