
module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('users',{
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastname: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          confirmPassword: {
            type: DataTypes.VIRTUAL,
            allowNull: true,
            
          },
          year: {
            type: DataTypes.ENUM('FE', 'SE', 'TE', 'BE'),
            allowNull: true,
          },
          branch: {
            type: DataTypes.ENUM('Computer', 'IT', 'Mechanical', 'Civil'),
            allowNull: true,
          },
          role: {
            type: DataTypes.STRING,
            defaultValue: 'user', // Default role is "user"
          },
    },{

    });
    return User;
}