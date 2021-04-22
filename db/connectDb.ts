import mongoose from "mongoose";

module.exports = function () {
  
  mongoose.connect(
    process.env.MONGO_DB ? process.env.MONGO_DB : `mongodb://localhost:27017/cats-authentication`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    },
    () => {
      console.log("Db connected");
    }
  );
};
