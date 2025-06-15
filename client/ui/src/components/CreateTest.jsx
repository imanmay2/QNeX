import "./css/createTest.css";
import { Options } from "./Options";
import { useState } from "react";
import axios from "axios";
function CreateTest() {
    let i = 1;
    let [test, setTest] = useState({
        testTitle: "",
        description: "",
        duration: "",
        test_id:"",
        questions_: [{
            question: "",
            options: {
                option_A: "",
                option_B: "",
                option_C: "",
            },
            ans: ""
        }]
    });
    let handleInput = ((event) => {
        let {name,value}=event.target;
        setTest((currData)=>{
            if(["testTitle","description","duration","test_id"].includes(name)){
                return{...currData,[name]:value};
            }
            return currData;
        })
    })

    let [Q, setQ] = useState({
        question: "",
        options: {
            option_A: "",
            option_B: "",
            option_C: "",
        },
        ans: ""
    });

    let handleQ=((event)=>{
        let {name,value}=event.target;
        setQ((currData)=>{
            if(["question","ans"].includes(name)){
                return {...currData,[name]:value}
            } else if(["option_A","option_B","option_C"].includes(name)){
                return {
                    ...currData, options:{
                        ...currData.options,[name]:value
                    }
                }
            }
            return currData;
        })
    });


    let addQ=(()=>{
        if(Q.question!="" && Q.ans!="" && Q.options.option_A!="" && Q.options.option_B!="" && Q.options.option_C!=""){
            setTest((currData)=>{
                return {...currData,
                    questions_:[...currData.questions_,Q]
                }
            })
        }
        // console.log(Q);
        console.log(test);
        setQ({
             question: "",
        options: {
            option_A: "",
            option_B: "",
            option_C: "",
        },
        ans: ""
        })
    })


    let createTest=(async()=>{
        if(test.testTitle!="" && test.duration!="" && test.description!="" && test.test_id!=""){
            const response=await axios.post("http://localhost:8080/createTest",test,{withCredentials:true});
            console.log(response.data.message);
        } else{
            //SnackBar
        }
    })
    return (
        <div className="createTest">
            <Options />
            <div className="main">
                <div className="content">
                    <div className="test_details">
                        <div className="heading_">
                            <font>Create New Test</font>
                            <button className="ai-create-btn">🚀 Create Test with AI</button>
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
                                <input type="text" name="test_id" value={test.test_id} onChange={handleInput} id="test_id"/>
                            </span>
                        </div>
                        <br /><br /><br />
                        <h2>Add Questions</h2>


                        <div className="addQ">
                            <label htmlFor="Question" id="question_1_label">Question 1</label><br />
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
                            <span className="delete">Delete Question</span>
                        </div>
                        <br /><br />
                        <center>
                            <span className="create_test_btn" onClick={createTest}>Create Test</span>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { CreateTest };