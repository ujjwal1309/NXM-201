module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define("batches", {
    name: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.INTEGER, allowNull: false },
  });

  return Batch;
};
