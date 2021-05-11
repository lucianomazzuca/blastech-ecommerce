const { DataTypes, Model } = require("sequelize");

class User extends Model {

  static setup(sequelizeInstance) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: 'isAdmin'
        }
      },
      {
        sequelize: sequelizeInstance,
        modelName: "User",
        tableName: "users",
        underscored: true,
      }
    );

    return User;
  };
};

module.exports = User; 
