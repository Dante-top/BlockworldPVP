module.exports = (sequelize, Sequelize) => {
    const WhiteList = sequelize.define("whitelist", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      address: {
        type: Sequelize.STRING,
        unique: true,
      }
    });
  
    return WhiteList;
  };