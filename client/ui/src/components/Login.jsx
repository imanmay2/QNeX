import './css/login.css';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();

    let [data, setData] = useState({
        Username: "",
        Password: ""
    });

    let handleInputChange = (event) => {
        setData((currData) => {
            return { ...currData, [event.target.name]: event.target.value }
        });
    };

    let handleSubmit_ = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://qnex.onrender.com/loginUser", data, {
                withCredentials: true
            });

            // console.log(response.data.flag);
            // console.log(document.cookie);
            // console.log(Cookies.get("login"));

            if (!response.data.flag) {
                setMsg(response.data.message);
                setOpen(true);
                return;
            } else if (response.data.login === "true"){
                Cookies.set("login", response.data.login);
                Cookies.set("username", response.data.username);
                Cookies.set("name", response.data.name);
                navigate("/dashboard");
            } else {
                setMsg("Login  before you proceed");
                setOpen(true);
            }
        } catch (err) {
            console.error(err);
        }
        setData({ Username: "", Password: "" });
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className="login_main">
            <div className="login_div">
                <span><p className="prompt-text">New To QNeX? <Link className='signup_' to="/signup">SignUp</Link></p></span>
                <h2 className='montserrat_font heading'>Login</h2>

                <div className="inputBox">
                    <TextField
                        label="UserName"
                        name='Username'
                        value={data.Username}
                        onChange={handleInputChange}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                </div>

                <div className="inputBox">
                    <FormControl fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            name='Password'
                            value={data.Password}
                            onChange={handleInputChange}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'hide password' : 'show password'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </div>

                <center>
                    <Button className="login_btn" variant="contained" onClick={handleSubmit_}>
                        Login &nbsp; <FaArrowRight />
                    </Button>
                    <p className="para montserrat_font small">
                        Secure your Communication with QNeX<br />
                        Welcome Back to QNeX!
                    </p>
                </center>

                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    action={action}
                >
                    <Alert variant="filled" severity="error" sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>
            </div>


        </div>
    );
}

export { Login };
