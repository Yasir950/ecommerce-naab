import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.get('/', (req, res)=>{
    res.send('hello it beginning');
})
const PORT = process.env.PORT || 8000;
app.listen(8000, ()=>{
    console.log('listening on port 8000')
})