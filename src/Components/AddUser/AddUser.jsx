import React, { useState } from 'react'
import styles from './AddUser.module.css';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../../api';

const AddUser = ({ show, handleClose }) => {
    const [userDetails, setUserDetails] = useState({ userName: '', password: '', role: 'author' });

    if (!show) {
        return null;
    }

    const handleChange = (e) => {
        setUserDetails((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_ENDPOINT}/users`, userDetails);

        } catch (error) {
            console.error(error)
        } finally {
            handleClose();
            setUserDetails({
                userName: '',
                password: '',
                role: 'author'
            });
        }

    };

    console.log("User data", userDetails);



    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.title}>New user details</h2>
                    <button onClick={handleClose} className={styles.closeButton}>X</button>
                </div>
                <div className={styles.modalBody}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="userName">User Name:-
                                <input
                                    type="text"
                                    name="userName"
                                    value={userDetails.userName}
                                    onChange={handleChange}
                                    placeholder="Enter Username"
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password:-
                                <input
                                    type="password"
                                    name="password"
                                    value={userDetails.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="role">Role:-
                                <select name='role' onChange={(e) => handleChange(e)} required>
                                    <option value="author" selected>Author</option>
                                    <option value="editor">Editor</option>
                                </select>
                            </label>
                        </div>

                        <div className={styles.loginBtn}>
                            <button type="submit" className={styles.submitButton}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser