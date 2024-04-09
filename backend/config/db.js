import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const URL = process.env.DBURL;


const connectDB = async() =>{
    try {

       await mongoose.connect(URL);
       console.log('Database connected successfully');
       
    } catch (error) {
        console.log('Database Connection Error', error.message);
        
    }
}

export default connectDB;