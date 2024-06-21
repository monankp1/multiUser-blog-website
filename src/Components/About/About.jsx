import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.about}>
                <p>about</p>
            </div>
            <div className={styles.about}>
                <p>copyright</p>
            </div>
        </div>
    )
}

export default About