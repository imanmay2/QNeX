import "./css/attendTest.css";
import { Options } from "./Options";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AttendTest() {
    const navigate = useNavigate();
    const [testId, setTestId] = useState("");

    const handleInputChange = (e) => {
        setTestId(e.target.value);
    };

    const handleSubmit = () => {
        if (testId.trim()) {
            // Navigate or perform logic with testId
            console.log("Entered Test ID:", testId);
            navigate(`/Test/${testId}`);

            
        }
    };

    return (
        <div className="attendTest">
            <Options />
            <div className="main_">
                <span className="heading">Attend Test</span>
                <div className="askid-container">
                    <label htmlFor="testId" className="askid-label">Enter Test ID</label>
                    <input
                        type="text"
                        id="testId"
                        className="askid-input"
                        value={testId}
                        onChange={handleInputChange}
                        placeholder="e.g., QNX12345"
                    />
                    <button className="submit-btn" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export { AttendTest };
