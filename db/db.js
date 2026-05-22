import mongoose from "mongoose";

const connectDb = async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected...!");
  } catch (error) {
    return res.status(500).json("Not Connected Database...!");
  }
};

export default connectDb;
