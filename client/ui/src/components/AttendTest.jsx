import { useEffect } from "react";
import "./css/attendTest.css";
import { Options } from "./Options";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

function AttendTest() {
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
    const navigate = useNavigate();
    const [testId, setTestId] = useState("");

    const handleInputChange = (e) => {
        setTestId(e.target.value);
    };

    const handleSubmit = async () => {
        if (testId.trim()) {
            // Navigate or perform logic with testId
            console.log("Entered Test ID:", testId);
            const response = await axios.get(`http://localhost:8080/findtest/${testId}`);
            if (response.data.find) {
                console.log("Attend Test page : ");
                console.log(response.data.find);
                navigate(`/Test/${testId}`,{state:response.data.find});
            } else {
                setMsg("Test_Id not found ! ");
                setServerity("error");
                setOpen(true);
            }
        }
    };

    return (
        <div className="attendTest">
            <Options />
            <div className="main_">
                <span className="heading">Attend Test</span>
                <div className="askid-container">
                    <label htmlFor="testId" className="askid-label">Enter Test ID</label>
                    <input
                        type="text"
                        id="testId"
                        className="askid-input"
                        value={testId}
                        onChange={handleInputChange}
                        placeholder="e.g., QNX12345"
                    />
                    <button className="submit-btn" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                action={action}
            >
                <Alert variant="filled" severity={serverity}>{msg}</Alert>
            </Snackbar>
        </div>
    );
}

export { AttendTest };