import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/userRouter.js';
const app = express();
dotenv.config();
const MONGOURL = process.env.MONGO_URL
const PORT = process.env.PORT
mongoose.connect(MONGOURL).then(() => {
    console.log("Connected to MongoDB");
    // app.listen(PORT, () => {
    //     console.log(`Server is running on port ${PORT}`);
    // });
}).catch(err=>console.log(err))

app.use('/', router);

export default app;