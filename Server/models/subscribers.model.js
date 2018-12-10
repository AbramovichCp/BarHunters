module.exports = (sequelize, DataTypes) => {
  const subscribers = sequelize.define(
    'subscribers',
    { 
      subscribe_id: { type: DataTypes.INTEGER, primaryKey: true },
      event_id: { type: DataTypes.INTEGER },
      user_id: { type: DataTypes.INTEGER }
    },
    {
      timestamps: false,
    }
  );
  return subscribers;
};