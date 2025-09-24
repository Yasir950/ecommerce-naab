import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const MONGOURL = process.env.MONGO_URL;
const PORT = process.env.PORT;
console.log(MONGOURL)
console.log(PORT)
mongoose.connect(MONGOURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
app.get("/", (req, res) => {
//   res.json({ message: "Hello from Express on Vercel!" });
});

export default app;
