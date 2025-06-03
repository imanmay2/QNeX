import "./css/options.css";
import { FiHome } from "react-icons/fi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
function Options() {
    return (
        <div className="option_div">
            <div className="tag"><h1>QNeX</h1></div>
            <hr />
            {/* <div className="menu">Menu</div> */}
            <div className="dash"><FiHome/> &nbsp;&nbsp;DashBoard</div>
            <div className="ct"><AiOutlinePlusSquare/> &nbsp;&nbsp;Create Test</div>
            <div className="at"><MdAssignmentTurnedIn/> &nbsp;&nbsp;Attend Test</div>
            <div className="rt"><AiOutlineFileSearch/> &nbsp;&nbsp;Review Test</div>
            <div className="setGap">
                <div className="settings"><FiUser/> &nbsp;&nbsp;Account</div>
                <div className="logout"><FiLogOut/> &nbsp;&nbsp;Logout</div>
            </div>

        </div>
    )
}
export { Options };