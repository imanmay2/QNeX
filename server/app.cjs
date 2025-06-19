///imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require("cookie-parser");

//initialize
const User = require("./models/user.cjs");
const Question = require("./models/question.cjs");
const ReviewTest=require("./models/reviewTest.cjs");
let flag = 0;


const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

//middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



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

//signup
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

                //cookies
                res.cookie("login", "true", { secure: false });
                res.cookie("username", userName, { secure: false });
                res.cookie("name", Name, { secure: false });  // secure false as using http. not https.
                console.log("User Signed Up!!");
                flag = 1;
                res.status(200).json({ 'message': "User saved successfully", "flag": flag });
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

//login 
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
                ///setting up cookies.
                res.cookie("login", "true", { secure: false });
                res.cookie("name", userRes[0].name, { secure: false });
                res.cookie("username", userRes[0].username, { secure: false });
                res.json({ "message": "User Logged in Successfully", "flag": flag });
            } else {
                res.json({ "message": "Password is incorrect ! " });
            }
        });
    } else {
        res.json({ "message": "Username is incorrect ! " });
    }
});


//Creating the test by saving the Question into the database.
app.post("/createTest", async (req, res) => {
    try {
        let test = req.body;
        console.log(test);
        let findTest = await Question.find({ test_id: test.test_id });
        console.log(findTest);
        if (!findTest.length) {
            const test_ = new Question({
                testTitle: test.testTitle,
                description: test.description,
                duration: test.duration,
                test_id: test.test_id,
                questions_: test.questions_.map((q) => {
                    return {
                        question: q.question,
                        questionNo: q.questionNo,
                        options: {
                            option_A: q.options.option_A,
                            option_B: q.options.option_B,
                            option_C: q.options.option_C,
                        },
                        ans: q.ans,
                    }
                })
            });
            await test_.save();
            console.log("Test saved successfully.");
            res.json({ "message": "Test created succesfully.", "flag": "success" });
        } else {
            res.json({ "message": "Test_ID already in use", "flag": "error" });
        }
    } catch (err) {
        res.json({ "message": err.message, "flag": "error" });
    }
})




// // fetching the test Question for a particular test_id.
// app.get("/test/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log("Attend Test Page: ");
//         let findId = await Question.find({ "test_id": id });
//         console.log(findId);
//         if (findId.length) {
//             res.json({ "test": findId, "flag": "success" });
//         } else {
//             res.json({ "test": findId, "flag": "error" });
//         }
//     } catch (err) {
//         res.status(500).json({ "test": [], "message": err.message, "flag": "error" });
//     }
// })

// cheking for the test id is present or not (in the attendTest.jsx)
app.get("/findtest/:test_id", async (req, res) => {
    try {
        let { test_id } = req.params;
        let findId = await Question.find({ "test_id": test_id });
        console.log("Backend : ");
        console.log(findId);
        if (findId.length) {
            res.json({ "find": findId });
            return;
        }
        res.json({ "find": false, "message": "Test id not found ! " });
    } catch (err) {
        res.json({ "find": false, "message": err.message });
    }
});


//fetching the 
app.post("/reviewTest",async(req,res)=>{
    try{
        let {ans,test_id}=req.body;
        let {username}=req.cookies;
        let score=0;
        let findAns=await Question.find({test_id:test_id});
        // console.log(findAns);
        for(let i=0;i<ans.length;i++){
            if(ans[i]===findAns[0].questions_[i].ans){
                score++;
            }
        }
        //adding the data in the reviewTest collection.
        if(findAns.length){
            const addResponse=new ReviewTest({
            username: username,
            test_id:test_id,
            response:ans,
            totalScore:ans.length,
            score:score
        });
        await addResponse.save();
        res.json({'message':"Data saved succesfully.","flag":"success"});
        }else{
            res.json({'message':"No Question id found.","flag":"error"});
        }
        
    } catch(err){
        res.status(500).json({"message":err.message});
    }
});

//logging out.
app.post("/logout", async (req, res) => {
    res.cookie("login", "false", { secure: false });
    res.json({ "flag": "true" });
})