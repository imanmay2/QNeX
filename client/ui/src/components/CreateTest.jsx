import "./css/createTest.css";
import { Options } from "./Options";
import { useState } from "react";
function CreateTest() {
    let i = 1;
    let [test, setTest] = useState({
        testTitle: "",
        description: "",
        duration: "",
        min: "",
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

    })

    let [Q, setQ] = useState([{
        question: "",
        options: {
            option_A: "",
            option_B: "",
            option_C: "",
        },
        ans: ""
    }]);
    

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
                                <label htmlFor="min">Min</label> <br />
                                <input type="text" name="min" value={test.min} onChange={handleInput} id="min" />
                            </span>
                        </div>
                        <br /><br /><br />
                        <h2>Add Questions</h2>
                        <div className="addQ">
                            <label htmlFor="Question" id="question_1_label">Question 1</label><br />
                            <input type="text" id="Question" name="question" value={test.questions_.question} onChange={handleInput} style={{ width: "90vh" }} /> <br /><br /><br />
                            <div className="options">
                                <span>
                                    <label htmlFor="option_A">Option A</label><br />
                                    <input type="text" id="option_A" name="option_A" value={test.questions_.options.option_A} onChange={handleInput} style={{ width: "30vh" }} />
                                </span>
                                <span>
                                    <label htmlFor="option_B">Option B</label><br />
                                    <input type="text" id="option_B" name="option_B" value={test.questions_.options.option_B} onChange={handleInput} style={{ width: "30vh" }} />
                                </span>
                                <span>
                                    <label htmlFor="option_C">Option C</label><br />
                                    <input type="text" id="option_C" name="option_C" value={test.questions_.options.option_C} onChange={handleInput} style={{ width: "30vh" }} />
                                </span>
                            </div>
                            <br /><br />
                            <label htmlFor="correctAns">Correct Answer</label><br />
                            <input type="text" id="correctAns" name="ans" value={test.questions_.ans} onChange={handleInput} style={{ width: "30vh" }} />
                            <span className="add_anotherQ">+ Add Another Question</span>
                            <span className="delete">Delete Question</span>
                        </div>
                        <br /><br />
                        <center>
                            <span className="create_test_btn">Create Test</span>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { CreateTest };