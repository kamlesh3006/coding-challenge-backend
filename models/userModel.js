
module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('users',{
        firstname: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          lastname: {
            type: DataTypes.STRING,
            allowNull: true,
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
            allowNull: true,//true
            
          },
          year: {
            type: DataTypes.ENUM('FE', 'SE', 'TE', 'BE'),
            allowNull: false,
          },
          branch: {
            type: DataTypes.ENUM('Computer', 'IT', 'Mechanical', 'Civil'),
            allowNull: false,
          },
          role: {
            type: DataTypes.STRING,
            defaultValue: 'user', // Default role is "user"
          },
          profilePicture: {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue: 'default.jpeg',
            validate: {
                isImage(value) {
                    if (value) {
                        // Check if the value is a valid image file (adjust file extensions as needed)
                        const allowedExtensions = ['jpg', 'jpeg', 'png'];
                        const fileExtension = value.split('.').pop().toLowerCase();
                        if (!allowedExtensions.includes(fileExtension)) {
                            throw new Error('Only image files (jpg, jpeg, png, gif) are allowed for the profile picture.');
                        }
                    }
                },
                isSize(value) {
                    if (value && value.size) {
                        // Check if the file size is within the specified limit (250 MB)
                        const maxSizeInBytes = 250 * 1024 * 1024; // 250 MB in bytes
                        if (value.size > maxSizeInBytes) {
                            throw new Error('Profile picture size cannot exceed 250 MB.');
                        }
                    }
                },
            },
        },
        dateOfBirth: {
          type: DataTypes.DATE,
          allowNull: true,
          validate: {
              isDate: {
                  msg: "Invalid date format. Please provide a valid date.",
              },
          },
      },
      phoneNumber: {
          type: DataTypes.STRING,
          allowNull: true,
          validate: {
              is: {
                  args: /^(\+\d{1,2}\s?)?(\(\d{1,4}\)|\d{1,4})([\s.-]?)\d{1,15}$/,
                  msg: "Invalid phone number. Please provide a valid phone number.",
              },
          },
      },
      address: {
          type: DataTypes.TEXT,
          allowNull: true,
      },
      bio: {
          type: DataTypes.TEXT,
          allowNull: true,
      },
      linkedinLink: {
          type: DataTypes.STRING,
          allowNull:true,
          validate: {
              isUrl: {
                  msg: "Invalid LinkedIn URL. Please provide a valid URL.",
              },
          },
      },
      skillsOrInterests: {
          type: DataTypes.TEXT,
          allowNull:true
      },
    },{

    });
    return User;
}