'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Asegúrate de que el nombre no sea nulo
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegúrate de que el email sea único
      validate: {
        isEmail: true // Valida que el formato del email sea correcto
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false // Asegúrate de que la contraseña no sea nula
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'image_url'
    },
  }, {
    tableName: 'user', // Nombre de la tabla en la base de datos
    timestamps: true, // Incluye createdAt y updatedAt
    // underscored: true, // Usa snake_case para nombres de columnas
  });

  // Exporta el modelo para usarlo en otras partes de la aplicación
  return User;
};


