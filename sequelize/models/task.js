'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    taskStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 10,
    },
    taskTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taskContent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taskCategory: {
      type: DataTypes.STRING,
    },
    taskTag: {
      type: DataTypes.STRING,
    },
    taskIsDone: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
      onDelete: 'CASCADE',
    });
  };
  return Task;
};
