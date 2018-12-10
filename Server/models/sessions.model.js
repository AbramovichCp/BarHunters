module.exports = (sequelize, DataTypes) => {
  const sessions = sequelize.define(
    'sessions',
    {
      session_id: { type: DataTypes.INTEGER, primaryKey: true},
      user_id: { type: DataTypes.INTEGER },
      refresh_token: { type: DataTypes.STRING },
      expired_at: {type: DataTypes.DATE}
    },
    {
      timestamps: false,
    }
  );
  return sessions;
};