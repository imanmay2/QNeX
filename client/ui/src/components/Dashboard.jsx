import "./css/dashboard.css";
import { Options } from "./Options";
import { User } from 'lucide-react';
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { RiArrowDownSLine } from "react-icons/ri";
import { PieChart } from "./PieChart";
import { BarGraph } from "./BarGraph";
function Dashboard() {
    let name = "Manmay";
    let username = "imanmay2";
    let totalTest=24;
    let attendedTest=16;
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
                                <PieChart />
                            </div>
                            
                        </div>
                        <div className="testRecords">
                            <h3>Total Tests : {totalTest}</h3> <br />
                            <h3>Tests Attended : {attendedTest}</h3>
                        </div>
                    </div>
                    <div className="S_Row">
                        <div className="ongoing">
                           Lists of Ongoing tests: 
                        </div>
                         <div className="bargraph">
                            <BarGraph/>
                        </div>
                    </div>
    
                </div>


            </div>
        </div>
    )
}
export { Dashboard };