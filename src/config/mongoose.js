import mongoose from "mongoose";
import dotenv from "dotenv";
//import { categorySchema } from "../features/product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;
export const connectUsingMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connected using mongoose");
    
  } catch (err) {
    console.log("Error while connecting to db");
    console.log(err);
  }
};

