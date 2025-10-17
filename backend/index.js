import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js';
import categoryRouter from './router/catRouter.js';
import orderRouter from './router/orderRouter.js';
import authRouter from './router/authRouter.js';
import dashboardRouter from './router/dashboardRouter.js';
const app = express();
dotenv.config();
const MONGOURL = process.env.MONGO_URL
const PORT = process.env.PORT
let isConnected = false;
app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
async function connectMongoDb() {
    try {
        await mongoose.connect(MONGOURL);
        isConnected = true;
        app.listen(8000, () => {
            console.log('connecting to port 8000')
        })
        console.log('connected to mongodb')
    } catch (error) {
        console.log('error connecting database' + error)
    }
}

app.use((req, res, next) => {
    if (!isConnected) {
        connectMongoDb()
    }
    next();
})
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', orderRouter);
app.use('/api', dashboardRouter);
app.use('/auth', authRouter)
connectMongoDb();
// export default app;