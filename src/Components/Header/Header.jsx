import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';

const Header = ({ isLoggedIn, handleLogin, handleLogout, userRole, handleAddUser, handleAddBlog }) => {


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Logo />
            </div>

            <div>
                {userRole && <button className={styles.addBlog} onClick={handleAddBlog}>AddBlog</button>}
                {userRole === 'admin' && <button className={styles.addUser} onClick={handleAddUser}>AddUser</button>}
                {isLoggedIn ? (
                    <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                ) : (
                    <button className={styles.loginButton} onClick={handleLogin}>Login</button>
                )}
            </div>
        </header>
    );
};

export default Header;
