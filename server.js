const { Sequelize ,DataTypes} = require('sequelize');
const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")
const app = express();
app.use(cors());

const port = process.env.PORT;

app.use(express.json()) //middleware
app.use("/api/users",require("./routes/userRoutes"));

app.use(errorHandler)


if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    console.error('Missing required environment variables for database connection.');
    process.exit(1); // Exit the application if required variables are not present
  }
  
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});
