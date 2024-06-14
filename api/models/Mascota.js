const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Mascota extends Model {
    static associate(models) {
      Mascota.belongsTo(models.User, { foreignKey: 'user_id' });
      Mascota.belongsToMany(models.Etiqueta, { through: "EtiquetaMascota", foreignKey: "mascotaId", as: "etiquetas"})
    }
  }
  Mascota.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: { type: DataTypes.UUID, allowNull: false },
      nombre: DataTypes.STRING,
      especie: DataTypes.STRING,
      raza: DataTypes.STRING,
      color: DataTypes.STRING,
      edad: DataTypes.INTEGER,
      sexo: DataTypes.STRING,
      descripcion: DataTypes.TEXT,
      fecha_perdida: DataTypes.DATE,
      estado: DataTypes.STRING,
      imagen_urls: DataTypes.ARRAY(DataTypes.TEXT),
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    },
    {
      sequelize,
      modelName: "Mascota",
      timestamps: false,
    }
  );
  return Mascota;
};
