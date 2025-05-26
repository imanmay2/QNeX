const express=require('express');
const cors=require('cors');
const mongoose = require('mongoose');




const app=express();
const PORT=8080;




const corsOptions={
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));



app.listen(PORT,(req,res)=>{
    console.log("Server is listening to "+PORT);
});


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/QNeX');
}


app.get("/data",(req,res)=>{
    res.json({'message':'Welcome to QNex'});
});