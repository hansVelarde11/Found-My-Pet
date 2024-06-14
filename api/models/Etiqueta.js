const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    static associate(models) {
      // Relación muchos a muchos con Post
      this.belongsToMany(models.Post, {
        through: "EtiquetaPost",
        foreignKey: "etiquetaId",
        as: "posts",
      });

      // Relación muchos a muchos con Mascota
      this.belongsToMany(models.Mascota, {
        through: "EtiquetaMascota",
        foreignKey: "etiquetaId",
        as: "mascotas",
      });
    }
  }

  Etiqueta.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Etiqueta",
      timestamps: false,
    }
  );

  return Etiqueta;
};
