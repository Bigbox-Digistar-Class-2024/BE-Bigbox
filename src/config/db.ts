import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/nodejs"

export const db = mongoose.connect(conectionString).then(() => console.log("Connected to MongoDB")).catch((err) => console.error(err));