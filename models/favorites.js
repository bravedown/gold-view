module.exports = function(sequelize, DataTypes) {
    const Favorites = sequelize.define("Favorites", {
      symbol: DataTypes.STRING,
    });
    Favorites.associate = models => {
      Favorites.belongsTo(models.User, {});
    }
    return Favorites;
  };
  