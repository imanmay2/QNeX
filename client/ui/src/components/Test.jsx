import "./css/test.css";
import { QBtn } from "./QBtn";

function Test() {
  return (
    <div className="test">
      <QBtn />
      <div className="maindiv">
        <div className="heading1">
          <span className="testTitle">Test: Data Structure and Algorithm</span>
          <span className="timer">Timer</span>
        </div>
        <br />
        <div className="heading2">
          <span className="marks"><u>Total Marks: 10</u></span>
          <span className="testid">Test ID: <u>QNX123</u></span>
          <span className="testid"><u>Created on: 4th June 2025</u></span>
        </div>

        <div className="Q">
          <h2>Question: 1. What is the Time complexity of a Binary Search Algorithm?</h2>
          <hr />
          <div className="options">
            <label className="option">
              <input className="input_" type="radio" name="q1" value="A" />
              O(log n)
            </label>
            <label className="option">
              <input className="input_" type="radio" name="q1" value="B" />
              O(n)
            </label>
            <label className="option">
              <input className="input_" type="radio" name="q1" value="C" />
              O(n log n)
            </label>
          </div>
        </div>

        <div className="btns">
            <button className="previous">Previous</button>
            <button className="next">Next</button>
            <button className="submit">Submit</button>
            </div>

      </div>
    </div>
  );
}

export { Test };
