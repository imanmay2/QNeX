import React, { useEffect, useRef, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import styles from './css/settings.module.css';
import { Options } from './Options';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import axios from 'axios';

function Settings() {
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState(false);
    const [serverity, setServerity] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    let [password, setPassword] = useState();

    useEffect(()=>{
        let fetch=async()=>{
            const response=await axios.get("http://localhost:8080/userData",{withCredentials:true});
        }
    })

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    let editRef = useRef(null);
    let saveRef = useRef(null);

    let [track, setTrack] = useState("edit");
    const handleSave = () => {
        // Send updated data to server if needed
    };

    const edit = () => {
        usernameRef.current.disabled = false;
        emailRef.current.disabled = false;
        passwordRef.current.disabled = false;

        editRef.current.style.innertext = 'cancel';

        saveRef.current.style.display = 'flex';
    };

    const handleClick = () => {
        if (track === "edit") {
            setTrack("save");
            usernameRef.current.disabled = false;
            emailRef.current.disabled = false;
            passwordRef.current.disabled = false;

            editRef.current.innerText="Save";
            editRef.current.style.backgroundColor="rgb(40, 167, 69)";
        } else if(track==="save"){
            setTrack("edit");
            usernameRef.current.disabled = true;
            emailRef.current.disabled = true;
            passwordRef.current.disabled = true;

            editRef.current.innerText="Edit";
            editRef.current.style.backgroundColor="#0c81b3";

            //  update the saved data in the database.



            setMsg("Data Saved successfully.");
            setServerity("success");
            setOpen(true);
        }
    }
    



    return (
        <div className={styles.profile}>
            <Options />
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.heading}>
                        <br />
                        <center>
                            <IoSettingsOutline /> <br />
                            Profile Settings</center>
                    </div>
                    <br /> <br />
                    <div className={styles.docs}>
                        <label htmlFor="username">Username</label>
                        <br />
                        <input ref={usernameRef} type="text" name='username' value={username} disabled />
                    </div>
                    <br />
                    <div className={styles.docs}>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input ref={emailRef} type="text" name='email' value={email} disabled />
                    </div>
                    <br />
                    <div className={styles.docs}>
                        <label htmlFor="password">Password</label>
                        <br />
                        <input ref={passwordRef} type="password" name='password' value={password} disabled />
                    </div>

                    {/* buttons */}
                    <br />
                    <button ref={editRef} className={styles.edit} onClick={handleClick}>Edit</button>

                    {/* <button ref={saveRef} className={styles.save} onClick={save}>Save</button> */}


                </div>
            </div>
             <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            action={action}
                        >
                            <Alert variant="filled" severity={serverity}>{msg}</Alert>
                        </Snackbar>
        </div>
    );
}

export default Settings;