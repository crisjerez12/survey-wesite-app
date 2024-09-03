import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("Already connecting");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "survey-website-app",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default connect;
