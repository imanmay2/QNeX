import { useEffect, useState } from "react";
import "./css/test.css";
import { QBtn } from "./QBtn";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ImCancelCircle } from "react-icons/im";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
function Test() {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [serverity, setServerity] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
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

  const navigate = useNavigate();
  const location = useLocation();
  // const test = location.state[0];
  const test={
    createdOn:"2025-06-24",
    testTitle:"Anatomy",
    description:"Exclusive Questions",
    duration:"1 hr",
    questions_:[{
      ans:"A",
      options:{option_A:"Femur",option_B:"Tibia",option_C:"Fibula"},
      question:"What is the longest bone in the lower limb?",
      questionNo: 1
    }]
  }  
  console.log("Location State");
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


  //Create the answer section.
  let [ans, setAns] = useState(Array(test.questions_.length).fill(null));
  let [total, setTotal] = useState(ans.length);
  let [attempted, setAttempt] = useState(0);
  let [notAttempted, setNotAttempt] = useState(0);
  //handleRadioButton Change.
  let handleOptionChange = (event) => {
    let updatedAns = [...ans];
    updatedAns[tracker] = event.target.value;
    setAns(updatedAns);
  }


  let handleSubmit = async () => {
    console.log("Ans: ");
    console.log(ans);

    let test_id=test.test_id;
    let testTitle=test.testTitle;
    //Sending the answer to the backend.
    let ansObj={ans,test_id,testTitle};
    const response = await axios.post("http://localhost:8080/reviewTest", ansObj, { withCredentials: true });

    if (response.data.flag == "success") {
      navigate("/dashboard");

      //send test submiited sucessfully.
      return;
    }
    else {
      setMsg(response.data.message);
      setServerity("error");
      setOpen(true);
    }
  }
  let calculate = () => {
    let notAttemptCount = ans.filter(val => val === null).length;
    setNotAttempt(notAttemptCount);
    setAttempt(ans.length - notAttemptCount);
  };


  let overlayRef = React.useRef(null);
  let showOverlay = () => {
    calculate();
    overlayRef.current.style.display = 'flex';
  }

  
  let hideOverlay = () => {
    overlayRef.current.style.display = 'none';
  }


  return (
    <div className="test_">

      {/* Overlay container */}
      <div className="overlay" ref={overlayRef} id="overlay">
        <div className="overlay-content">
          <div id="close" onClick={hideOverlay}><ImCancelCircle /></div>

          Total Questions : {total} <br />
          No. of  Questions Attempted : {attempted} <br />
          Questions not attempted : {notAttempted} <br />  <br />
          <button type="submit" className="overlaySubmit" onClick={handleSubmit}>Submit</button>
        </div>
      </div>

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
          <span className="testid_"><u>Created on: {test.createdOn}</u></span>
        </div>

        <div className="Q_">
          <h2 className="Question_">Question: {test.questions_[tracker].questionNo} . {test.questions_[tracker].question}</h2>
          <hr />

          {/* options */}
          <div className="options_">
            <label className="option_">
              <input className="input_" type="radio" name={`q${tracker}`} value="A" onChange={handleOptionChange} checked={ans[tracker] === "A"} />
              {test.questions_[tracker].options.option_A}
            </label>
            <label className="option_">
              <input className="input_" type="radio" name={`q${tracker}`} value="B" onChange={handleOptionChange} checked={ans[tracker] === "B"} />
              {test.questions_[tracker].options.option_B}
            </label>
            <label className="option_">
              <input className="input_" type="radio" name={`q${tracker}`} value="C" onChange={handleOptionChange} checked={ans[tracker] === "C"} />
              {test.questions_[tracker].options.option_C}
            </label>
          </div>
        </div>
        <div className="btns_">
          <button className="previous_" onClick={prev}>Previous</button>
          <button className="next_" onClick={next}>Next</button>
          <button className="submit_" onClick={showOverlay}>Submit</button>
        </div>
      </div>


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

export { Test };