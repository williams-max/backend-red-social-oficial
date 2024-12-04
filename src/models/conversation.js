'use strict';
module.exports = (sequelize, DataTypes) => {

  const Conversation = sequelize.define('Conversation', {
    isGroup: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'is_group'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'conversation', // Nombre de la tabla en la base de datos
    timestamps: true, // Incluye createdAt y updatedAt
    // underscored: true, // Usa snake_case para nombres de columnas
  });

  // Exporta el modelo para usarlo en otras partes de la aplicación
  return Conversation;
};


