import { useEffect, useState } from "react";
import "./css/reviewTest.css";
import { Options } from "./Options";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from "react-router-dom";
function ReviewTest() {
  let  navigate=useNavigate();
  let [test,setTest]=useState([]);
  useEffect(() => {
    let fetchData=async()=>{
      try{
        const response=await axios.get(`http://localhost:8080/reviewTest/${Cookies.get("username")}`,{
          withCredentials:true
        });
        setTest(Array.isArray(response.data.Tests)?response.data.Tests:[]);
      } catch(err){
        console.log(err.message);
      }
    }
    fetchData();
  },[]);



  const handleTestReview=async(test_id)=>{
    const username=Cookies.get("username");
    const response=await axios.get(`http://localhost:8080/reviewTest/${username}/${test_id}`);
    let testReview_=response.data.Tests;
    console.log(testReview_);
    //navigate to the respective page for the test to be reviewed.
    navigate(`/reviewtest/${username}/${test_id}`,{state:test_id});
  }

  return (
    <div className="reviewTest">
      <Options />
      <div className="main">
        <span>Review Tests</span>
        
        <div className="tests">
          { (test.length===0) ? <p>No Tests Found !</p> :
          test.map(({ test_id,testTitle, attemptedOn,totalScore, score}, i) => {
            return (
              <div className="testCard" key={i}>
                <div className="testInfo">
                  <p><strong>Test: </strong>{testTitle}</p>
                  <p><strong>Test_id: </strong>{test_id}</p>
                  <p><strong>Attempted on:</strong>{attemptedOn}</p>
                  <span className="btn" onClick={()=>handleTestReview(test_id)}>Review Test</span>
                </div>
                <div className="progressContainer">
                  <CircularProgressbar
                    value={(score*100)/totalScore}
                    text={score+"/"+totalScore}
                    styles={buildStyles({
                      textColor: "#5BA4E7",
                      pathColor: "#5BA4E7",
                      trailColor: "#e0e0e0"
                    })}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export { ReviewTest };