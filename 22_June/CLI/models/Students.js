module.exports = (Sequelize, DataTypes) => {
  const Students = Sequelize.define("students", {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false },
    age: DataTypes.INTEGER,
    courseID: {
      type: DataTypes.INTEGER,
      references: {
        model: "courses",
        key: "id",
      },
    },
  });
  return Students;
};
