import './css/login.css';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import Button from '@mui/material/Button';

import { FaArrowRight } from "react-icons/fa6";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import {Link} from 'react-router-dom';


function Login(){
    const [showPassword, setShowPassword] = React.useState(false);
    
        const handleClickShowPassword = () => setShowPassword((show) => !show);
    
        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
    
        const handleMouseUpPassword = (event) => {
            event.preventDefault();
        };
    return (
        <>
        <div className="login_div">
            <p className='montserrat_font leftMargin small'><font className="small">New to QNeX?</font><nav> <Link to="/">SignUp</Link></nav></p>
            <br />
            <h2 className='montserrat_font'>Login</h2>
             <br /> <br />

              {/* UserName */}
             <TextField
                id="input-with-icon-textfield"
                label="UserName" fullWidth
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
            /> <br /> <br /> <br /> <br />

             {/* EMAIL
                         <TextField id="standard-basic" label="Email" variant="standard" fullWidth /> 
                         <br /><br /><br /> */}

                         <FormControl sx={{ width: '30rem' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" className='width'>Password</InputLabel>
                <OutlinedInput
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
                /></FormControl> <br /> <br /> <br />

            <center><Button variant="contained" className='colorBtn'>Login &nbsp; <FaArrowRight/></Button> <br /> <br />
            <p className="para montserrat_font small"> Secure your Communication with QNeX <br /><br />
            Welcome Back to QNeX!
            </p></center>
             
        </div>
        </>
    )
}

export {Login};