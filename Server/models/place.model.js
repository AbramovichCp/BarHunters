module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define(
    'place', 
    {
      place_id: { type: DataTypes.INTEGER, primaryKey: true },
      place_name: { type: DataTypes.STRING },
      place_address: { type: DataTypes.STRING },
      place_capacity: { type: DataTypes.INTEGER },
      place_photo: { type: DataTypes.STRING },
      place_contact: { type: DataTypes.STRING },
      place_coords: { type: DataTypes.ARRAY(DataTypes.DECIMAL) },
      place_type: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
    }
  );
  return place;
};
