require('dotenv').config();
const mongoose = require("mongoose");
console.log('DB_URL:', process.env.DB_URL); // Add this line to verify


async function dbConnect() {
    mongoose.set("strictQuery", true);
    mongoose.connect( 
        
        process.env.DB_URL,
      {
        //   these are options to ensure that the connection is done properly
        dbName: 'vocab-builder',
        useNewUrlParser: true,
        useUnifiedTopology: true, 
      }
    )
    .then(() => {
        console.log("Successfully connected to MongoDB!");
      })
      .catch((error) => {
        console.log("Unable to connect to MongoDB!");
        console.error(error);
      });
}

module.exports = dbConnect;