// /////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
mongoose.set('strictQuery', true)



 
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
            
    });
    console.log('database connected ');
    // console.log('hello database'); //
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;



