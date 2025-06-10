import "./css/createTest.css";
import { Options } from "./Options";
function CreateTest(){
    return (
        <div className="createTest">
            <Options />
            <div className="main">
                <div className="content">
                    <div className="test_details">
                        <div className="heading_">
                            <font>Create New Test</font> <button className="ai-create-btn">🚀 Create Test with AI</button>
                        </div>
                        <br />
                        <div> <label htmlFor="test_title">Test Title</label> <br />
                            <input type="text" id="test_title" style={{ width: "85vh" }} /></div>
                        <br />
                        <div className="info">
                            <span>
                                <label htmlFor="description">Description</label> <br />
                                <input type="text" id="description" style={{ width: "65vh" }} />
                            </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                <label htmlFor="duration">Duration</label> <br />
                                <input type="text" id="duration" />
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>
                                <label htmlFor="min">Min</label> <br />
                                <input type="text" id="min" />
                            </span>
                        </div> <br /><br /><br />
                        <h2>Add Questions</h2>
                        <div className="addQ">
                            <label htmlFor="Question">Question 1</label><br />
                            <input type="text" id="Question" style={{ width: "90vh" }} /> <br />
                            <br /><br />
                            <div className="options">
                                <span>
                                    <label htmlFor="option_A">Option A</label><br />&nbsp;&nbsp;
                                    <input type="text" id="option_A" style={{ width: "30vh" }} />
                                </span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>
                                    <label htmlFor="option_B">Option B</label><br />&nbsp;&nbsp;
                                    <input type="text" id="option_B" style={{ width: "30vh" }} />
                                </span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>
                                    <label htmlFor="option_C">Option C</label><br />&nbsp;&nbsp;
                                    <input type="text" id="option_C" style={{ width: "30vh" }} />
                                </span>
                            </div>
                            <br /><br /> <br />
                            <label htmlFor="correctAns">Correct Answer</label>&nbsp;&nbsp;<br />
                            <input type="text" id="option_C" style={{ width: "30vh" }} />

                            <span className="add_anotherQ">
                                + Add Another Question
                            </span>
                            <span className="delete">
                                Delete Question
                            </span>
                        </div>
                        <br /> <br />
                        <center>
                            <span className="create_test_btn">Create Test</span></center>
                    </div>
                </div>
            </div>
        </div>
    )
}
export { CreateTest };