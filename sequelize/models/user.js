'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    password: DataTypes.INTEGER,
    email: DataTypes.STRING,
    isAdmin: DataTypes.INTEGER,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
