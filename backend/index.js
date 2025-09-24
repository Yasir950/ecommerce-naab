import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/userRouter.js';
const app = express();
dotenv.config();
const MONGOURL = process.env.MONGO_URL
const PORT = process.env.PORT
let isConnected = false;
app.use(express.json());
async function connectMongoDb() {
    try {
      await  mongoose.connect(MONGOURL);
     isConnected = true;
     app.listen(8000, ()=>{
        console.log('connecting to port 8000')
     })
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
app.use('/', router);
app.use('/', (req, res)=>{
res.send('hello')
});
connectMongoDb();
// export default app;