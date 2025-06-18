import { useEffect, useState } from "react";
import "./css/test.css";
import { QBtn } from "./QBtn";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
function Test() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const test=location.state[0];
  console.log("Test Page: ");
  console.log(test);
  const [tracker, setTracker] = useState(0);
  let prev = () => {
    setTracker((tracker) => {
      if (tracker == 0) {
        return tracker;
      }
      return tracker - 1;
    })
  }

  let next = () => {
    setTracker((tracker) => {
      if (tracker == test.questions_.length - 1) {
        return tracker;
      }
      return tracker + 1;
    })
  }

  let setQ = (ques) => {
    setTracker(ques);
  }

  //tracking the test answers..
  const [answer,setAnswer]=useState(Array(test.questions_.length).fill(""));

let handleChange=(qIdx,optionIdx)=>{
  let updatedAns=[...answer];
  updatedAns[qIdx]=optionIdx;
  setAnswer(updatedAns);
}

  return (
    <div className="test_">
      <QBtn questions_={test.questions_} setQ={setQ} />
      <div className="maindiv_">
        <div className="heading1_">
          <span className="testTitle_">{test.testTitle}</span>
          <span className="timer_">{test.duration}</span>
        </div>
        <br />
        <div className="heading2_">
          <span className="marks_"><u>{test.description}</u></span>
          <span className="testid_">Test ID: <u>{test.test_id}</u></span>
          <span className="testid_"><u>Created on: 4th June 2025</u></span>
        </div>

        <div className="Q_">
          <h2 className="Question_">Question: {test.questions_[tracker].questionNo} . {test.questions_[tracker].question}</h2>
          <hr />

          {/* options */}
          <div className="options_">
            <label className="option_">
              <input className="input_" type="radio" name="q1" value="A" />
              {test.questions_[tracker].options.option_A}
            </label>
            <label className="option_">
              <input className="input_" type="radio" name="q1" value="B" />
              {test.questions_[tracker].options.option_B}
            </label>
            <label className="option_">
              <input className="input_" type="radio" name="q1" value="C" />
              {test.questions_[tracker].options.option_C}
            </label>
          </div>
          {/* <div className="options_">
            {test.questions_[tracker].options.map((opt,i)=>{
                <label key={i}>
              <input
                type="radio"
                name={`question-${tracker}`}
                value={opt}
                checked={answer[tracker] === opt}
                onChange={() => handleChange(index, opt)}
              />
              {opt}
            </label>
            }
            )}
          </div> */}



        </div>
        <div className="btns_">
          <button className="previous_" onClick={prev}>Previous</button>
          <button className="next_" onClick={next}>Next</button>
          <button className="submit_">Submit</button>
        </div>
      </div>

    </div>
  );



}

export { Test };
