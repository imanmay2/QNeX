const express=require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const app=express();
const PORT=8080;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User=require("./models/user.cjs");
let flag=0;



const corsOptions={
    origin: "http://localhost:5173",
};

//middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//functions
function checkEmailValidation(email){
    return email.includes("@gmail.com");
}

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


app.post("/saveUser",async(req,res)=>{
   const {Name,Email,Password}=req.body;
    try{
         console.log(req.body);
         let hashPass="";
         let emailValidation=checkEmailValidation(Email);
         console.log(emailValidation);
         if(emailValidation==true){
            hashPass=await bcrypt.hash(Password, saltRounds);
            const user1=new User({
            name:Name,
            email:Email,
            password:hashPass
         });
         await user1.save();
         console.log("User Signed Up!!");
         flag=1;
         res.status(200).json({ 'message': "User saved successfully" ,"flag":flag});
         } else{
            res.json({'message':'User Data not saved!'});
         }
         
         
    } catch(err){
        console.log(err);
        res.status(500).json({'message':"Error in pushing the data. "});
    }
});


app.post("/loginUser",(req,res)=>{
    console.log(req.body);
});