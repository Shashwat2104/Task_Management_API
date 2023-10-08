const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.MONGO_URL);
// const connection = mongoose.connect(
//   "mongodb+srv://admin:admin@cluster0.qoffovv.mongodb.net/task?retryWrites=true&w=majority"
// );

module.exports = { connection };
