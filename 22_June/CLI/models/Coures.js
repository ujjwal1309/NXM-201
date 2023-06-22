module.exports = (Sequelize, DataTypes) => {
    const Courses = Sequelize.define("courses", {
      name: {type:DataTypes.STRING,allowNull:false},
    });
    return Courses;
  };
  