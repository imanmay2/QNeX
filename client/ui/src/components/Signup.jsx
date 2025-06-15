import styles from './css/signup.module.css';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
function Signup() {
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [flashOpen, setFlashOpen] = React.useState(false);
    const [flashMsg, setFlashMsg] = React.useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();
    const handleFlashClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setFlashOpen(false);
    };

    const [data, setData] = useState({ Name: "", Email: "", Password: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/saveUser", data,{
                withCredentials:true
            });
            if (!response.data.flag) {
                setFlashMsg(response.data.message);
                setFlashOpen(true);
                return;
            } else if(Cookies.get('login')=="true"){
                navigate("/dashboard");
            } else {
                setMsg("Signup  before you proceed");
                setOpen(true);
            }
            setData({ Name: '', Email: '', Password: '' });
        } catch (err) {
            console.error(err);
            setFlashMsg("Something went wrong. Please try again.");
            setFlashOpen(true);
        }
    };

    return (
        <div className={styles.signup_wrapper}>
            <div className={styles.signup_card}>
                <p className={styles.signup_text}>
                    Already Registered? <Link className={styles.link__} to="/">Login</Link>
                </p>
                <h2 className={styles.heading}>SignUp</h2>

                <TextField
                    name="Name"
                    value={data.Name}
                    label="Name"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        )
                    }}
                />
                <br /><br />

                <TextField
                    name="Email"
                    value={data.Email}
                    label="Email"
                    fullWidth
                    onChange={handleInputChange}
                    variant="standard"
                />
                <br /><br />

                <FormControl variant="standard" fullWidth>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                        name="Password"
                        value={data.Password}
                        onChange={handleInputChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
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
                <br /><br />

                <Button fullWidth variant="contained" onClick={handleSubmit}>
                    SIGN UP &nbsp; <FaArrowRight />
                </Button>

                <br />
                <p className={styles.para__}>
                    Secure your Communication with QNeX<br />
                    Welcome to QNeX!
                </p>

                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={flashOpen}
                    autoHideDuration={4000}
                    onClose={handleFlashClose}
                >
                    <Alert onClose={handleFlashClose} variant='filled' severity="error" sx={{ width: '100%' }}>
                        {flashMsg}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export { Signup };
