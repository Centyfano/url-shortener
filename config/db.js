const mongoose = require("mongoose");

const conn = async () => {
 const db = await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 });

 console.log(`MongoDB Connected: ${db.connection.host}`);
};

module.exports = conn;
