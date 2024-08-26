import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

const connect = () => {
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
    mongoose.connect(MONGODB_URI!, {
      dbName: "survey-website-app",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (error: any) {
    console.log("Error", error);
    throw new Error("Error: ", error);
  }
};
export default connect;
