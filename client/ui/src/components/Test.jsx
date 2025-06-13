import { useState } from "react";
import "./css/test.css";
import { QBtn } from "./QBtn";

function Test() {
  const tests = [
    {
      questionNo: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(log n)", "O(n)", "O(n log n)"]
    },
    {
      questionNo: 2,
      question: "Which algorithm uses divide and conquer?",
      options: ["Bubble Sort", "Merge Sort", "Selection Sort"]
    },
    {
      questionNo: 3,
      question: "Which of the following is a NoSQL database?",
      options: ["MySQL", "MongoDB", "Oracle"]
    },
    {
      questionNo: 4,
      question: "Which scheduling algorithm is preemptive?",
      options: ["FCFS", "Round Robin", "SJF"]
    },
    {
      questionNo: 5,
      question: "What does HTTP stand for?",
      options: ["HyperText Transfer Protocol", "Hyperlink Text Protocol", "Host Transfer Protocol"]
    },
    {
      questionNo: 6,
      question: "Which tag is used to insert an image in HTML?",
      options: ["<img>", "<image>", "<src>"]
    },
    {
      questionNo: 7,
      question: "What is the output of typeof null?",
      options: ["object", "null", "undefined"]
    },
    {
      questionNo: 8,
      question: "What data type is returned by input() in Python?",
      options: ["string", "int", "float"]
    },
    {
      questionNo: 9,
      question: "Which is a supervised learning algorithm?",
      options: ["K-means", "Linear Regression", "DBSCAN"]
    },
    {
      questionNo: 10,
      question: "What does SDLC stand for?",
      options: ["Software Development Life Cycle", "System Design Logic Code", "Software Deployment Level Code"]
    }
  ];

  const [tracker,setTracker] =useState(0);

  let prev=()=>{
    setTracker((tracker)=>{
      if(tracker==0){
        return tracker;
      }
      return tracker-1;
    })
  }

    let next=()=>{
    setTracker((tracker)=>{
      if(tracker==tests.length-1){
        return tracker;
      }
      return tracker+1;
    })
  }

  let setQ=(ques)=>{
    setTracker(ques);
  }
  

  return (
    <div className="test_">
      <QBtn questions={tests} setQ={setQ}/>
      <div className="maindiv_">
        <div className="heading1_">
          <span className="testTitle_">Test: Data Structure and Algorithm</span>
          <span className="timer_">Timer</span>
        </div>
        <br />
        <div className="heading2_">
          <span className="marks_"><u>Total Marks: 10</u></span>
          <span className="testid_">Test ID: <u>QNX123</u></span>
          <span className="testid_"><u>Created on: 4th June 2025</u></span>
        </div>

        <div className="Q_">
          <h2 className="Question_">Question: {tests[tracker].questionNo} . {tests[tracker].question}</h2>
          <hr />
          <div className="options_">
            <label className="option_">
              <input className="input_" type="radio" name="q1" value="A" />
              {tests[tracker].options[0]}
            </label>
            <label className="option_">
              <input className="input_" type="radio" name="q1" value="B" />
              {tests[tracker].options[1]}
            </label>
            <label className="option_">
              <input className="input_" type="radio" name="q1" value="C" />
             {tests[tracker].options[2]}
            </label>
          </div>
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
