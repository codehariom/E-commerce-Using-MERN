import mongoose from "mongoose";
import {db_name} from "../constant.js";


const connectDb = async() =>{
    try{
        const connection = await mongoose.connect(`${process.env.mongodb_url}/${db_name}`);
        
        console.log(`\n Your Database is connected! db host : ${connection.connection.host}`);
    } catch (error){
        console.error("Database is not connetced",error);
        process.exit(1);
    }
};

export default connectDb;