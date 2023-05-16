module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("students", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    batchId: {
      type: DataTypes.INTEGER,
      references: {
        model: "batches",
        key: "id",
      },
      allowNull: false,
    },
  });

  return Student;
};
