import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';




const Login = ({ show, handleClose }) => {
    const [loginDetails, setLoginDetails] = useState({ userName: '', password: '' });

    const dispatch = useDispatch();



    if (!show) {
        return null;
    }


    const handleChange = (e) => {
        setLoginDetails((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };





    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'user_login', payload: loginDetails })
        handleClose()
        setLoginDetails({ userName: '', password: '' });
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.title}>Login</h2>
                    <button onClick={handleClose} className={styles.closeButton}>×</button>
                </div>
                <div className={styles.modalBody}>
                    {/* {error && <div className={styles.error}>{error}</div>} */}
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="userName">User Name:-
                                <input
                                    type="text"
                                    name="userName"
                                    value={loginDetails.userName}
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
                                    value={loginDetails.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.loginBtn}>
                            {/* <button type="submit" className={styles.submitButton}>Login</button> */}
                            <Button htmlType='submit' type='primary' style={{ color: 'black' }}>Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
