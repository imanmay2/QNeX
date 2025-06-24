import React, { useState } from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import styles from './css/settings.module.css';
import { Options } from './Options';
function Settings() {
    const [username, setUsername] = useState('manmay');
    const [email, setEmail] = useState('manmay@example.com');
    const [editing, setEditing] = useState(false);

    const handleSave = () => {
        setEditing(false);
        // Send updated data to server if needed
    };

    return (
        <div className='profile_'>
            <Options />
            <div className={styles.container}>
                <div className={styles.header}>
                    <IoSettingsOutline size={30} />
                    <h2>Account Settings</h2>
                </div>

                <div className={styles.card}>
                    <div className={styles.formGroup}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            disabled={!editing}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            disabled={!editing}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.actions}>
                        {!editing ? (
                            <button onClick={() => setEditing(true)}>Edit</button>
                        ) : (
                            <button className={styles.saveBtn} onClick={handleSave}>
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
