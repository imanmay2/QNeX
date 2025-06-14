const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("./models/user.cjs");
let flag = 0;


const corsOptions = {
    origin: "http://localhost:5173",
};

//middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//functions
function checkEmailValidation(email) {
    // return email.includes("@gmail.com");
    if (email.includes('@')) {
        let arr = email.split('@');
        if (arr[arr.length - 1] == "gmail.com") {
            return true;
        }
    }
    return false;
}
function generateUsername(email) {
    return email.split('@')[0];
}

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/QNeX');
    console.log("Database Connected !");
}

app.listen(PORT, (req, res) => {
    console.log("Server is listening to " + PORT);
});



app.get("/data", (req, res) => {
    res.json({ 'message': 'Welcome to QNex' });
});


app.post("/saveUser", async (req, res) => {
    const { Name, Email, Password } = req.body;
    let userRes = await User.find({ email: Email });
    if (!userRes.length) {
        try {
            console.log(req.body);
            let hashPass = "";
            let emailValidation = checkEmailValidation(Email);
            console.log(emailValidation);
            if (emailValidation == true) {
                //Generate a username;
                let userName = generateUsername(Email);
                // console.log("UserName is: " + userName);
                hashPass = await bcrypt.hash(Password, saltRounds);   //Encrytption of the password.
                const user1 = new User({
                    name: Name,
                    email: Email,
                    password: hashPass,
                    username: userName,
                });
                await user1.save();
                console.log("User Signed Up!!");
                flag = 1;
                res.status(200).json({ 'message': "User saved successfully", "flag": flag });
               res.redirect("localhost:5173/dashboard");

            } else {
                res.json({ 'message': 'Email is Invalid ! ' });
            }


        } catch (err) {
            console.log(err);
            res.status(500).json({ 'message': "Error in pushing the data. " });
        }
    } else {
        res.json({ 'message': 'User already exists ! ' });
    }
});


app.post("/loginUser", async (req, res) => {
    let flag = 0;
    const { Username, Password } = req.body;
    let userRes = await User.find({ username: Username });
    if (userRes.length) {
        let hashPass = userRes[0].password;
        console.log(hashPass);
        bcrypt.compare(Password, hashPass, function (err, result) {
            if (result) {
                flag = 1;
                console.log("User logged in successfully");
                res.json({ "message": "User Logged in Successfully", "flag": flag,"userData":userRes });
            } else {
                res.json({ "message": "Password is incorrect ! " });
            }
        });
    } else {
        res.json({ "message": "Username is incorrect ! " });
    }
});