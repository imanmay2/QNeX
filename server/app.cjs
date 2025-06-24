///imports
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 8080;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cookieParser = require("cookie-parser");
const axios=require("axios");

//initialize
const User = require("./models/user.cjs");
const Question = require("./models/question.cjs");
const ReviewTest = require("./models/reviewTest.cjs");
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

function getDateToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

//login route.
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
                createdOn: test.createdOn,
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





// cheking for the test id is present or not (in the attendTest.jsx).
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


// review the test.
app.post("/reviewTest", async (req, res) => {
    try {
        let { ans, test_id,testTitle } = req.body;
        let { username } = req.cookies;
        let score = 0;
        let findAns = await Question.find({ test_id: test_id });
        // console.log(findAns);
        for (let i = 0; i < ans.length; i++) {
            if (ans[i] === findAns[0].questions_[i].ans) {
                score++;
            }
        }
        //adding the data in the reviewTest collection.
        if (findAns.length) {
            const addResponse = new ReviewTest({
                username: username,
                test_id: test_id,
                testTitle:testTitle,
                response: ans,
                totalScore: ans.length,
                attemptedOn: getDateToday(),
                score: score
            });
            await addResponse.save();
            res.json({ 'message': "Data saved succesfully.", "flag": "success" });
        } else {
            res.json({ 'message': "No Question id found.", "flag": "error" });
        }

    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
});

app.get("/reviewTest/:username", async (req, res) => {
    const { username } = req.params;
    let findTests = await ReviewTest.find({ username: username });
    
    console.log(username);
    if (findTests.length){
        console.log(findTests);
        res.json({ "Tests": findTests, "flag": true });
    }else{
        res.json({"Tests":"Error ! Nothing found!!","flag":"error"});
    }
});

// fetching the reviewTest via filtering through username and test_id.
app.get("/reviewTest/:username/:test_id", async (req, res) => {
    const { username ,test_id} = req.params;
    let findTests = await ReviewTest.find({ username: username,test_id:test_id });
    
    if (findTests.length){
        console.log(findTests);
        res.json({ "Tests": findTests, "flag": true });
    }else{
        res.json({"Tests":"Error ! Nothing found!!","flag":"error"});
    }
});


//Creating test with AI.
app.post("/api/ai", async (req, res) => {
  const { inputObject, formatObject } = req.body;

  if (!inputObject || !formatObject) {
    return res.status(400).json({ error: "inputObject and formatObject are required." });
  }

  const prompt = `
You are an expert in creating structured JSON.
Given the following input object:
${JSON.stringify(inputObject, null, 2)}

Generate a JSON response in this format:
${JSON.stringify(formatObject, null, 2)}

Make sure to keep "description", "duration", and "test_id" same as input. 
Also note that , give the "ans" field like:  "ans":A (in caps lock).
 Do not include explanations. Just give valid JSON.
  `;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        message: prompt,
        model: "command-r-plus",
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawText = response.data.text;
    let jsonResponse;

    try {
      jsonResponse = JSON.parse(rawText);
    } catch (err) {
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      jsonResponse = JSON.parse(cleaned);
    }
    console.log(jsonResponse);

    //object created...now need to save in the database.
    

    //calling the /createTest route to save the data into the database.
    const res_=await axios.post("http://localhost:8080/createTest",jsonResponse,{
        withCredentials:true
    })
    res.json(res_.data);

  } catch (error) {
    console.error("Cohere API Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate JSON from Cohere" });
  }
});



//logging out.
app.post("/logout", async (req, res) => {
    res.cookie("login", "false", { secure: false });
    res.json({ "flag": "true" });
});