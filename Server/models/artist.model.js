module.exports = (sequelize, DataTypes) => {
    const artist = sequelize.define(
      'artists',
      {
        artist_id: { type: DataTypes.INTEGER, primaryKey: true },
        artist_name: { type: DataTypes.STRING },
        artist_about: { type: DataTypes.STRING },
      },
      {
        timestamps: false,
      }
    );
    return artist;
  };