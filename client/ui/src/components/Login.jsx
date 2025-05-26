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

        let [data,setData]=useState({
            Username:"",
            Password:""
        });

        let handleInputChange=(event)=>{
            setData((currData)=>{
                return {...currData,[event.target.name]:event.target.value}
            })
        }

        let handleSubmit_=async(event)=>{
            event.preventDefault();
            try{
                const response=await axios.post("http://localhost:8080/loginUser",data);
                console.log(" Suceess "+response.data);
                
            } catch(err){
                console.error(err);
            }
            setData({
                Username:"",
                Password:""
            });
        }

    return (
        <>
        <div className="login_div">
            <p className='montserrat_font leftMargin small'><font className="small">New to QNeX?</font><Link to="/">SignUp</Link></p>
            <br />
            <h2 className='montserrat_font'>Login</h2>
             <br /> <br />


              {/* UserName */}
             <TextField
                id="input-with-icon-textfield"
                label="UserName" name='Username' value={data.Username} onChange={handleInputChange} fullWidth
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

             

                         <FormControl sx={{ width: '30rem' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" className='width'>Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password" name='Password' value={data.Password} onChange={handleInputChange}
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

            <center><Button variant="contained" onClick={handleSubmit_}>Login &nbsp; <FaArrowRight/></Button> <br /> <br />
            <p className="para montserrat_font small"> Secure your Communication with QNeX <br /><br />
            Welcome Back to QNeX!
            </p></center>
        </div>
        </>
    )
}

export {Login};