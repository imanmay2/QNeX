const express=require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const app=express();
const PORT=8080;



const User=require("./models/user.cjs");




const corsOptions={
    origin: "http://localhost:5173",
};

//middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/QNeX');
  console.log("Database Connected !");
}

app.listen(PORT,(req,res)=>{
    console.log("Server is listening to "+PORT);
});



app.get("/data",(req,res)=>{
    res.json({'message':'Welcome to QNex'});
});


app.post("/saveUser",(req,res)=>{
    // let {Name,Email,Password}=req.body;
    // console.log("Name of the User: "+Name);
    console.log(req.body);
});

