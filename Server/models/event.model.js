module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define(
    'event',
    {
      event_id: { type: DataTypes.INTEGER, primaryKey: true },
      event_title: { type: DataTypes.STRING },
      place_id: { type: DataTypes.INTEGER },
      event_poster: { type: DataTypes.TEXT },
      manager_id: { type: DataTypes.INTEGER },
      artists: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
      event_about: { type: DataTypes.TEXT },
      event_date: { type: DataTypes.DATE },
      premium: {  type: DataTypes.BOOLEAN }
    },
    {timestamps: false}
  );
  return event;
};
