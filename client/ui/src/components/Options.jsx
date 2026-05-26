import "./css/options.css";
import { FiHome } from "react-icons/fi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Options() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        Cookies.remove("login");
        Cookies.remove("name");
        Cookies.remove("username");
        navigate("/");
    }

    const navItems = [
        { className: "dash", icon: <FiHome />, label: "DashBoard", to: "https://qnex.netlify.app/dashboard", path: "/dashboard" },
        { className: "ct", icon: <AiOutlinePlusSquare />, label: "Create Test", to: "https://qnex.netlify.app/createTest", path: "/createTest" },
        { className: "at", icon: <MdAssignmentTurnedIn />, label: "Attend Test", to: "https://qnex.netlify.app/attendTest", path: "/attendTest" },
        { className: "rt", icon: <AiOutlineFileSearch />, label: "Review Test", to: "https://qnex.netlify.app/reviewTest", path: "/reviewTest" },
    ];

    return (
        <aside className="option_div" aria-label="Primary navigation">
            <div className="tag">
                <span className="brand-mark">Q</span>
                <h1>QNeX</h1>
            </div>

            <nav className="nav-list">
                {navItems.map((item) => (
                    <div
                        className={`${item.className} nav-item ${location.pathname === item.path ? "active" : ""}`}
                        key={item.path}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <Link to={item.to} className="nav-link">{item.label}</Link>
                    </div>
                ))}
            </nav>

            <div className="setGap">
                <div className={`settings nav-item ${location.pathname === "/settings" ? "active" : ""}`}>
                    <span className="nav-icon"><FiUser /></span>
                    <Link to="https://qnex.netlify.app/settings" className="nav-link">Profile</Link>
                </div>
                <div className="logout nav-item">
                    <span className="nav-icon"><FiLogOut /></span>
                    <Link onClick={handleLogout} className="nav-link">Logout</Link>
                </div>
            </div>
        </aside>
    )
}
export { Options };
