import "./css/createTest.css";
import { Options } from "./Options";

function CreateTest() {
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
                            <input type="text" id="test_title" style={{ width: "85vh" }} />
                        </div>
                        <br />
                        <div className="info">
                            <span>
                                <label htmlFor="description">Description</label> <br />
                                <input type="text" id="description" style={{ width: "65vh" }} />
                            </span>
                            <span>
                                <label htmlFor="duration">Duration</label> <br />
                                <input type="text" id="duration" />
                            </span>
                            <span>
                                <label htmlFor="min">Min</label> <br />
                                <input type="text" id="min" />
                            </span>
                        </div>
                        <br /><br /><br />
                        <h2>Add Questions</h2>
                        <div className="addQ">
                            <label htmlFor="Question" id="question_1_label">Question 1</label><br />
                            <input type="text" id="Question" style={{ width: "90vh" }} /> <br /><br /><br />
                            <div className="options">
                                <span>
                                    <label htmlFor="option_A">Option A</label><br />
                                    <input type="text" id="option_A" style={{ width: "30vh" }} />
                                </span>
                                <span>
                                    <label htmlFor="option_B">Option B</label><br />
                                    <input type="text" id="option_B" style={{ width: "30vh" }} />
                                </span>
                                <span>
                                    <label htmlFor="option_C">Option C</label><br />
                                    <input type="text" id="option_C" style={{ width: "30vh" }} />
                                </span>
                            </div>
                            <br /><br />
                            <label htmlFor="correctAns">Correct Answer</label><br />
                            <input type="text" id="correctAns" style={{ width: "30vh" }} />
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