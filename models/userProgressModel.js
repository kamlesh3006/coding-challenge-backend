module.exports = (sequelize,DataTypes) => {
    const UserProgress = sequelize.define('userProgress', {
        status: DataTypes.STRING,
        solvedDate: {
            type: DataTypes.DATE,
            allowNull: true, // Adjust this based on your requirements
          }
      },
      {
        hooks: {
          beforeUpdate: (userProgress, options) => {
            // Check if the status has changed to a value indicating the question is solved
            if (userProgress.changed('status') && userProgress.status === 'solved') {
              // Set solvedDate to the current date and time before updating the record
              userProgress.solvedDate = new Date();
            }
          },
        },
      });
    return UserProgress;
}