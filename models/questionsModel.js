
module.exports = (sequelize,DataTypes) => {
    const Question = sequelize.define('questions', {
        problem_statement: DataTypes.STRING,
        description: DataTypes.STRING,
        difficulty: DataTypes.STRING,
        example: {
          type: DataTypes.JSON // Assuming you want to store as JSON
          
        },
        testcases: {
          type: DataTypes.JSON // Assuming you want to store as JSON
          
        },
      },{

    });
    return Question;
}