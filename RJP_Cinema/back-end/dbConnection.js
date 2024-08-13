const mongoose = require('mongoose');

const connectDB = async() => {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/rjp_cinemas');
    console.log('Connected to Database')}
  catch(error){
    console.log(error)}
}
module.exports = connectDB;