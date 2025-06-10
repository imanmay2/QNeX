import "./css/options.css";
import { FiHome } from "react-icons/fi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
function Options() {
    return (
        <div className="option_div">
            <div className="tag"><h1>QNeX</h1></div>
            {/* <hr /> */}
            <br />
            {/* <div className="menu">Menu</div> */}
            <div className="dash"><FiHome/> &nbsp;&nbsp;<Link to="http://localhost:5173/dashboard" className="nav-link">DashBoard</Link></div>
            <div className="ct"><AiOutlinePlusSquare/> &nbsp;&nbsp;<Link to="http://localhost:5173/createTest" className="nav-link">Create Test</Link></div>
            <div className="at"><MdAssignmentTurnedIn/> &nbsp;&nbsp;<Link to="http://localhost:5173/attendTest" className="nav-link">Attend Test</Link></div>
            <div className="rt"><AiOutlineFileSearch/> &nbsp;&nbsp;<Link to="http://localhost:5173/reviewTest" className="nav-link">Review Test</Link></div>
            <div className="setGap">
                <div className="settings"><FiUser/> &nbsp;&nbsp;<Link to="http://localhost:5173/settings" className="nav-link">Settings</Link></div>
                <div className="logout"><FiLogOut/> &nbsp;&nbsp;<Link to="http://localhost:5173/logout" className="nav-link">Logout</Link></div>
            </div>
        </div>
    )
}
export { Options };