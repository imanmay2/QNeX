import "./css/attendTest.css";
import { Options } from "./Options";
function AttendTest(){
    return(
        <div className="attendTest">
            <Options/>
            
            <div className="main_">
                <font className="heading">Attend Tests</font>
                <div className="askid">
                    <center>Test ID</center>

                </div>
            </div>
        </div>
    );
}
export {AttendTest};