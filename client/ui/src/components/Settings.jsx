import React, { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import styles from './css/settings.module.css';
import { Options } from './Options';
function Settings() {
    const [username, setUsername] = useState('manmay');
    const [email, setEmail] = useState('manmay@example.com');
    let [password, setPassword] = useState()
    const [editing, setEditing] = useState(false);

    const handleSave = () => {
        setEditing(false);
        // Send updated data to server if needed
    };




    return (
       <div className={styles.profile}>
        <Options/>
       </div>
    );
}

export default Settings;
