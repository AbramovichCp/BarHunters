module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      user_id: { type: DataTypes.INTEGER, primaryKey: true},
      user_name: { type: DataTypes.STRING },
      user_email: { type: DataTypes.STRING },
      is_verified: { type: DataTypes.BOOLEAN },
      user_phone: { type: DataTypes.STRING },
      user_password: { type: DataTypes.STRING },
      verification_token: {type: DataTypes.STRING},
      token_expiry: {type: DataTypes.DATE},
      role: {type: DataTypes.STRING}
    },
    {
      timestamps: false,
    }
  );
  return users;
};