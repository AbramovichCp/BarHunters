module.exports = function(sequelize, DataTypes) {
  return sequelize.define('managers', {
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    places: {
      type: 'ARRAY'
    }
  }, {
    tableName: 'managers',
    timestamps: false
  });
};
