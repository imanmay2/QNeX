import "./css/createTest.css";
import { Options } from "./Options";
import { useState } from "react";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { ImCancelCircle } from "react-icons/im";
import { useRef } from "react";
function CreateTest() {
    function getTodayDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const yyyy = today.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    }

    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(false);
    const [serverity, setServerity] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    let [i, seti] = React.useState(1);
    let [test, setTest] = useState({
        testTitle: "",
        description: "",
        duration: "",
        test_id: "",
        createdOn: "",
        questions_: []
    });
    let handleInput = ((event) => {
        let { name, value } = event.target;
        setTest((currData) => {
            if (["testTitle", "description", "duration", "test_id"].includes(name)) {
                return { ...currData, [name]: value };
            }
            return currData;
        })
    })

    let [Q, setQ] = useState({
        question: "",
        questionNo: i,
        options: {
            option_A: "",
            option_B: "",
            option_C: "",
        },
        ans: ""
    });

    let handleQ = ((event) => {
        let { name, value } = event.target;
        setQ((currData) => {
            if (["question", "ans"].includes(name)) {
                return { ...currData, [name]: value }
            } else if (["option_A", "option_B", "option_C"].includes(name)) {
                return {
                    ...currData, options: {
                        ...currData.options, [name]: value
                    }
                }
            }
            return currData;
        })
    });


    let addQ = (() => {
        if (Q.question != "" && Q.ans != "" && Q.options.option_A != "" && Q.options.option_B != "" && Q.options.option_C != "") {
            const newQ = {
                ...Q,
                questionNo: i
            };
            setTest((currData) => {
                return {
                    ...currData,
                    questions_: [...currData.questions_, newQ]
                }
            })

            console.log(test);
            seti(i + 1);
            setMsg("Question Added ! ");
            setServerity("success");
            setOpen(true);
            setQ({
                question: "",
                questionNo: i + 1,
                options: {
                    option_A: "",
                    option_B: "",
                    option_C: "",
                },
                ans: ""
            })
        } else {
            setMsg("Please enter all the details to proceed !!");
            setServerity("error");
            setOpen(true);
        }
    })


    let createTest = (async () => {
        if (test.questions_.length == 0) {
            setMsg("Please Add atleast 1 Question ! ");
            setServerity("error");
            setOpen(true);
            return;
        }
        if (Q.question && Q.ans && Q.options.option_A && Q.options.option_B && Q.options.option_C) {
            setTest((currData) => ({
                ...currData,
                questions_: [...currData.questions_, Q]
            }));
        }
        if (test.testTitle != "" && test.duration != "" && test.description != "" && test.test_id != "") {
            let final = { ...test, createdOn: getTodayDate() }
            const response = await axios.post("http://localhost:8080/createTest", final, { withCredentials: true });
            setMsg(response.data.message);
            setServerity(response.data.flag);
            setOpen(true);

            if(response.data.flag == "success") {
                setTest({
                    testTitle: "",
                    description: "",
                    duration: "",
                    test_id: "",
                    createdOn: "",
                    questions_: []
                });
                setQ({
                    question: "",
                    questionNo: i,
                    options: {
                        option_A: "",
                        option_B: "",
                        option_C: "",
                    },
                    ans: ""
                })
            }

        } else {
            setMsg("Please enter all the details to proceed ! ");
            setServerity("error");
            setOpen(true);
        }
    })

    let deleteQuestion = (() => {
        setQ({
            question: "",
            questionNo: i,
            options: {
                option_A: "",
                option_B: "",
                option_C: "",
            },
            ans: ""
        })
        setMsg("Question Deleted ! ");
        setServerity("success");
        setOpen(true);
    })


    let overlayRef = React.useRef(null);
    let handleSubmit = () => {

    }

    let hideOverlay = () => {
        overlayRef.current.style.display = 'none';
    }
    let showOverlay = () => {
        overlayRef.current.style.display = "flex";
    }

    // usestate .
    let [AI,setAI]=useState({
        subject:"",
        topic:"",
        
    });

    
    return (
        <div className="createTest">
            <Options />
            <div className="main">


                {/* Overlay Container */}
                <div className="overlay-container_" ref={overlayRef} id="overlay">
                    <div className="overlay-content_">
                        <div id="close_" onClick={hideOverlay}><ImCancelCircle /></div><br />
                        <h2 classname="heading2_"> Create Test with the power of AI.</h2>
                        <br /><br /><br />
                        <p classname="subject">Subject : &nbsp;&nbsp; <input style={{ width: "40%" }} type="text" /></p> <br />
                        <p classname="subject">Topic : &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; <input style={{ width: "40%" }} type="text" /></p> <br />
                        <p classname="subject">Description : &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; <input style={{ width: "40%" }} type="text" /></p> <br />
                        <p>Enter the medium of the test:  &nbsp;&nbsp; &nbsp; <select>
                            <option value="">--Choose an option--</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Difficult</option>
                        </select></p> <br /><br />

                        <p classname="subject">Number of Questions : &nbsp;&nbsp; <input style={{ width: "15%", height:"5%" }} type="text" /></p><br />
                        <p classname="subject">Duration of the test:  &nbsp;&nbsp; <input style={{ width: "30%", height:"5%" }} type="text" /></p> <br />
                        <p classname="subject">Enter the  test_id : &nbsp;&nbsp; <input style={{ width: "20%", height:"5%" }} type="text" /></p> <br /><br />
                       
                        <button type="submit" className="overlaySubmit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="content">
                    <div className="test_details">
                        <div className="heading_">
                            <font>Create New Test</font>
                            <button className="ai-create-btn" onClick={showOverlay}>🚀 Create Test with AI</button>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="test_title" id="test_title_label">Test Title</label> <br />
                            <input type="text" id="test_title" name="testTitle" value={test.testTitle} onChange={handleInput} style={{ width: "85vh" }} />
                        </div>
                        <br />
                        <div className="info">
                            <span>
                                <label htmlFor="description">Description</label> <br />
                                <input type="text" name="description" value={test.description} id="description" onChange={handleInput} style={{ width: "65vh" }} />
                            </span>
                            <span>
                                <label htmlFor="duration">Duration</label> <br />
                                <input type="text" name="duration" value={test.duration} onChange={handleInput} id="duration" />
                            </span>
                            <span>
                                <label htmlFor="test_id">Test_ID</label> <br />
                                <input type="text" placeholder="QNX123" name="test_id" value={test.test_id} onChange={handleInput} id="test_id" />
                            </span>
                        </div>
                        <br /><br /><br />
                        <h2>Add Questions</h2>


                        <div className="addQ">
                            <label htmlFor="Question" id="question_1_label">Question {i}</label><br />
                            <input type="text" id="Question" name="question" value={Q.question} onChange={handleQ} style={{ width: "90vh" }} /> <br /><br /><br />
                            <div className="options">
                                <span>
                                    <label htmlFor="option_A">Option A</label><br />
                                    <input type="text" id="option_A" name="option_A" value={Q.options.option_A} onChange={handleQ} style={{ width: "30vh" }} />
                                </span>
                                <span>
                                    <label htmlFor="option_B">Option B</label><br />
                                    <input type="text" id="option_B" name="option_B" value={Q.options.option_B} onChange={handleQ} style={{ width: "30vh" }} />
                                </span>
                                <span>
                                    <label htmlFor="option_C">Option C</label><br />
                                    <input type="text" id="option_C" name="option_C" value={Q.options.option_C} onChange={handleQ} style={{ width: "30vh" }} />
                                </span>
                            </div>
                            <br /><br />
                            <label htmlFor="correctAns">Correct Answer</label><br />
                            <input type="text" id="correctAns" name="ans" value={Q.ans} onChange={handleQ} style={{ width: "30vh" }} />
                            <span className="add_anotherQ" onClick={addQ}>+ Add Another Question</span>
                            <span className="delete" onClick={deleteQuestion}>Reset Question</span>
                        </div>
                        <br /><br />
                        <center>
                            <span className="create_test_btn" onClick={createTest}>Create Test</span>
                        </center>
                    </div>
                </div>
            </div>

            {/* SnackBar for Error */}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                action={action}
            >
                <Alert variant="filled" severity={serverity}>{msg}</Alert>
            </Snackbar>
        </div>
    );
}

export { CreateTest };