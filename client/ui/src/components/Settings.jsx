import React, { useRef, useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import styles from './css/settings.module.css';
import { Options } from './Options';
function Settings() {
    const [username, setUsername] = useState('manmay');
    const [email, setEmail] = useState('manmay@example.com');
    let [password, setPassword] = useState();

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    let editRef = useRef(null);
    let saveRef = useRef(null);
    let cancelRef = useRef(null);
    const handleSave = () => {
        // Send updated data to server if needed
    };

    const edit = () => {
        usernameRef.current.disabled = false;
        emailRef.current.disabled = false;
        passwordRef.current.disabled = false;

        editRef.current.style.display = 'none';
        saveRef.current.style.display = 'flex';
        cancelRef.current.style.display = 'flex';
    };

    const cancel = () => {
        usernameRef.current.disabled = true;
        emailRef.current.disabled = true;
        passwordRef.current.disabled = true;

        editRef.current.style.display = 'flex';
        saveRef.current.style.display = 'none';
        cancelRef.current.style.display = 'none';
    };


    let save = () => {

        //post request to the backend.
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
                    <button ref={editRef} className={styles.edit} onClick={edit}>Edit</button>
                    <button ref={cancelRef} className={styles.cancel} onClick={cancel}>Cancel</button>
                    <button ref={saveRef} className={styles.save} onClick={save}>Save</button>


                </div>
            </div>
        </div>
    );
}

export default Settings;