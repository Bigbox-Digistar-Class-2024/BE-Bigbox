import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectionString = process.env.MONGO_URL || "mongodb://localhost:27017/nodejs"

export const db = mongoose.connect(conectionString).then
                    (()=>console.log("Conected to MongoDB")).catch((err)=>console.error(err));