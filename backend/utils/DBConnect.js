import mongoose from "mongoose";

let hasConnectionListeners = false;

const logMongoError = (label, error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[MongoDB] ${label}: ${message}`);
};

const attachConnectionListeners = () => {
  if (hasConnectionListeners) return;
  hasConnectionListeners = true;

  mongoose.connection.on("disconnected", () => {
    console.warn("[MongoDB] Disconnected from database");
  });

  mongoose.connection.on("reconnected", () => {
    console.info("[MongoDB] Reconnected to database");
  });

  mongoose.connection.on("error", (error) => {
    logMongoError("Connection error", error);
  });
};

const DBConnect = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    const error = new Error("MONGO_URI is missing in environment variables");
    logMongoError("Configuration error", error);
    throw error;
  }

  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (mongoose.connection.readyState === 2) {
      console.info("[MongoDB] Connection already in progress");
      return mongoose.connection;
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    attachConnectionListeners();
    return conn.connection;
  } catch (error) {
    logMongoError("Initial connection failed", error);
    throw new Error("Unable to connect to MongoDB");
  }
};

export default DBConnect;
