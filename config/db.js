import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
   try {
      // Connecting to MongoDB
      const conn = await mongoose.connect(process.env.MONGO_DB, {
         serverSelectionTimeoutMS: 10000, // Timeout after 5 seconds instead of 30
      });

      console.log(`MongoDB database connected: ${conn.connection.host}`.bgMagenta.white);
   } catch (error) {
      console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);

      // Exit process with failure
      process.exit(1);
   }
};

export default connectDB;
