module.exports = (sequelize, Sequelize) => {
    const ClaimList = sequelize.define("claimlist", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      sol_address: {
        type: Sequelize.STRING,
        unique: true,
      },
      max_mint: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
    });
  
    return ClaimList;
};