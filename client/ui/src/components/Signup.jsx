import './css/signup.css';
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
import MuiAlert from '@mui/material/Alert';


function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [flashOpen, setFlashOpen] = React.useState(false);
    const [flashMsg, setFlashMsg] = React.useState('');
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

     let handleFlashClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setFlashOpen(false);
    };


    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };


    //handle change.
    let [data, setData] = useState({
        Name: "",
        Email: "",
        Password: ""
    });


   

    let handleInputChange = (event) => {
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        setData((currData) => {
            currData[fieldName] = fieldValue;
            return { ...currData };
        });
    }

    let handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/saveUser", data);
            console.log(response.data);
            if (!response.data.flag) {    // we need a valid response from the API.
                setFlashMsg("Invalid Email. Please enter a valid email address.");
                setFlashOpen(true);
                return;
            }
            setData({
                Name: '',
                Email: '',
                Password: ''
            });
        } catch (err) {
            console.error(err);
            setFlashMsg("Something went wrong. Please try again.");
            setFlashOpen(true);
        }

    }


    return (
        <div className='signup_div'>
            <p className='montserrat_font leftMargin small'><font className="small">Already member?</font>  <Link to="/login">Login</Link></p>

            <h2 className='montserrat_font'>Sign Up</h2>
            <br />



            {/* NAME */}
            <TextField
                id="input-with-icon-textfield"
                name="Name" onChange={handleInputChange} value={data.Name}
                label="Name" fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    },
                }}
                variant="standard"
            /> <br /> <br /> <br />


            {/* EMAIL */}
            <TextField name="Email" value={data.Email} id="standard-basic" label="Email" variant="standard" onChange={handleInputChange} fullWidth />

            <br /><br /> <br />
            <br />

            {/* PASSWORD */}
            <FormControl sx={{ width: '30rem' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" className='width'>Password</InputLabel>
                <OutlinedInput name="Password" value={data.Password} onChange={handleInputChange}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
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
                /></FormControl> <br /> <br />

            <center><Button variant="contained" onClick={handleSubmit}>SignUp &nbsp; <FaArrowRight /></Button> <br /> <br />
                <p className="para montserrat_font small">Secure your Communication with QNeX</p></center>


            <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center" }} open={flashOpen} autoHideDuration={4000} onClose={handleFlashClose}>
                <MuiAlert onClose={handleFlashClose} severity="error" sx={{ width: '100%' }}>
                    {flashMsg}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export { Signup };