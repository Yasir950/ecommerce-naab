import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/userRouter.js';
const app = express();
dotenv.config();
const MONGOURL = process.env.MONGO_URL
const PORT = process.env.PORT
let isConnected = false;
async function connectMongoDb() {
    try {
      await  mongoose.connect(MONGOURL,{useNewUrlParser:true, useUnifiedTopology:true});
     isConnected = true;
     console.log('connected to mongodb')
    } catch (error) {
        console.log('error connecting database' + error)
    }
}

app.use((req,res,next)=>{
    if(!isConnected){
        connectMongoDb()
    }
    next();
})
app.use('/', (req, res)=>{
res.send('hello')
});

export default app;