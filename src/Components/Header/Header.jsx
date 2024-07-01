import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import ButtonComponent from '../ButtonComponent';

const Header = ({ isLoggedIn, handleLogin, handleLogout, userRole, handleAddUser, handleAddBlog }) => {


    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Logo />
            </div>
            
            <div>
                {userRole &&  <ButtonComponent name='AddBlog' onClick={handleAddBlog} className='addBlog' />}
                {userRole === 'admin' && <ButtonComponent name='AddUser' onClick={handleAddUser}  className='addUser' />}
                {isLoggedIn ? (
                    <ButtonComponent name='Logout' onClick={handleLogout} className='logoutButton' />
                ) : (
                    <ButtonComponent name='Login' onClick={handleLogin} className='loginButton' />
                )}
            </div>
        </header>
    );
};

export default Header;
