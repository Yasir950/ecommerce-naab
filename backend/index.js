import express from 'express';
const app = express();

app.get('/', (req, res)=>{
    res.send('hello it beginning');
})
app.listen(8000, ()=>{
    console.log('listening on port 8000')
})