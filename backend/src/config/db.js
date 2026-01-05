import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db successfully");
  } catch (error) {
    console.log("Failed to connect to db", error);
    process.exit(1);
  }
};

export { connectToDB };
