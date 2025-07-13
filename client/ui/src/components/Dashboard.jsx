import "./css/dashboard.css";
import { Options } from "./Options";
import { User } from 'lucide-react';
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { RiArrowDownSLine } from "react-icons/ri";
import { PieChart } from "./PieChart";
import { BarGraph } from "./BarGraph";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Dashboard() {
    let [attempted, setAttempted] = useState();
    let [notAttempted, setnotAttempted] = useState();
    let [test, setTest] = useState([]);
    let [testData,setTestData]=useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        let auth=(async()=>{
            try{
                let response=await axios.get("https://qnex.onrender.com/authenticate",{withCredentials:true});
            if(response.data.flag==="false"){
                navigate("/");
                return;
            }
           
            } catch(err){
                console.error(err.message);
            }

        })

        auth();
    },[navigate])

    
    const reviewTest = async (test_id) => {
        const username = Cookies.get("username");
        const response = await axios.get(`https://qnex.onrender.com/reviewTest/${username}/${test_id}`);
        let testReview_ = response.data.Tests;
        console.log(testReview_);
        //navigate to the respective page for the test to be reviewed.
        navigate(`/reviewtest/${username}/${test_id}`, { state: test_id });
    }

    function countAttemptedTests( tests=[] ) {
        let attemptedTestList = {};
        //Get the current month
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        //check for last 4 months including current
        for (let i = currentMonth; i > currentMonth - 4; i--) {
            if (i < 1) {
                attemptedTestList[12 + i] = 0;
            } else
                attemptedTestList[i] = 0;
        }

        for (let i = 0; i < tests.length; i++) {
            let date = tests[i].attemptedOn.split("-");
            let year = parseInt(date[0]);
            let month = parseInt(date[1]);

            if ((year == currentYear || year == currentYear - 1) &&
                ((currentMonth - 3 < 1 && month - 12 >= currentMonth - 3 && month - 12 <= currentMonth) ||
                    (month >= currentMonth - 3 && month <= currentMonth))) {
                attemptedTestList[month] += 1;
            }
        }
        //return a dataset of months and count of tests
        return attemptedTestList; // format: {3:1,2:2,1:0,12:1}

    }

    useEffect(() => {
        let fetch = async () => {
            try {
                let res = await axios.get("https://qnex.onrender.com/getData", {
                    withCredentials: true
                });
                console.log(res.data);
                setAttempted(res.data.T);
                setnotAttempted(res.data.Q - attempted);
            } catch (err) {
                res.json({ 'message': err.message });
            }
        }

        let fetchTest = async () => {
            let res = await axios.get(`https://qnex.onrender.com/reviewTest/${Cookies.get('username')}`);
            console.log(res.data.Tests);
            
            setTest(res.data.Tests);

            setTestData(countAttemptedTests(res.data.Tests));
            
            console.log(testData);
            
        }

        

        fetch();
        fetchTest();
       
    }, [attempted, notAttempted]);


    let name = Cookies.get("name");
    let username = Cookies.get("username");
    //fetch date:
    function getFormattedDate() {
        const date = new Date();

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        const dayName = days[date.getDay()];
        const day = date.getDate();
        const monthName = months[date.getMonth()];
        const year = date.getFullYear();
        return `${dayName}, ${day} ${monthName} ${year}`;
    }

    return (
        <div className="dashboard">
            <Options />
            <div className="main">
                <div className="nav">
                    <font className="designDash">Dashboard</font>

                    <div id="details">
                        <User size={38} strokeWidth={2} /> &nbsp; &nbsp;
                        <div className="name">
                            <b>{name}</b> <br />
                            <font id="username">{username}</font>
                        </div> <RiArrowDownSLine />
                    </div>
                </div>

                <br />
                <center> <hr className="line" width="95%" /></center>

                <br />
                <div className="greet">
                    <div className="content">
                        <h2> Welcome Back , Mr. {name} !  <HiOutlineFaceSmile /> </h2>
                        <div className="space">
                            <font className="quote">Always take care of your health to carry out Smart.</font></div>
                    </div>
                    <div id="date">
                        {getFormattedDate()}
                    </div>
                </div>
                <div className="footer">
                    <div className="F_Row">
                        <div className="piechart">
                            <div className="pie">
                                <PieChart attempted={attempted} notAttempted={notAttempted} />
                            </div>
                        </div>
                        <div className="ongoing">
                            <span className="head"> Tests Attempted : </span><br /> <br />
                            <div className="testList">
                                {Array.isArray(test) && test.length ? test.map(({ testTitle, test_id }, i) => {
                                    return (
                                        <div className="indiTest" key={i}>
                                            <span className="setFont">{testTitle}</span> &nbsp;&nbsp;&nbsp;&nbsp; <button className="RT" onClick={() => reviewTest(test_id)}>Review Test</button>
                                        </div>
                                    )
                                }) : <span> Test Not Attempted</span>}
                            </div>
                        </div>
                    </div>
                    <div className="S_Row">
                        <div className="testRecords">
                            <h2 className="brandTitle">QNeX</h2>
                            <p className="quoteText">"Learning is not attained by chance, it must be sought for with ardor and attended to with diligence."</p>
                            <div className="stats">
                                <h3>Tests Attempted: {attempted}</h3>
                                <h3>Total Tests: {attempted + notAttempted}</h3>
                            </div>
                        </div>

                        <div className="bargraph">
                            <BarGraph barData_={testData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export { Dashboard };