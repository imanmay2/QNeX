const express=require('express');
const cors=require('cors');



const app=express();
const PORT=8080;
const corsOptions={
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.listen(PORT,(req,res)=>{
    console.log("Server is listening to "+PORT);
});


app.get("/data",(req,res)=>{
    res.json({'message':'Welcome to QNex'});
});