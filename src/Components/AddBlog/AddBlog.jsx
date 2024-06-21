import React, { useState } from 'react';
import styles from './AddBlog.module.css';
import { BACKEND_ENDPOINT } from '../../api';
import axios from 'axios';

const AddBlog = ({ show, handleClose }) => {
    const [blogDetails, setBlogDetails] = useState({
        author: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : '',
        date: new Date().toISOString().split('T')[0]
    });

    if (!show) {
        return null;
    }

    const handleChange = (e) => {
        setBlogDetails((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_ENDPOINT}/blogs`, blogDetails);
            handleClose();
        } catch (error) {
            console.error(error);
        } finally {
            setBlogDetails({
                author: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).userName : '',
                date: new Date().toISOString().split('T')[0],
                title: '',
                content: '',
                image: ''
            })
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.title}>Edit Blog</h2>
                    <button onClick={handleClose} className={styles.closeButton}>X</button>
                </div>
                <div className={styles.modalBody}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={blogDetails.title}
                                    onChange={handleChange}
                                    placeholder="Enter Title"
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="content">Content:
                                <textarea
                                    name="content"
                                    value={blogDetails.content}
                                    onChange={handleChange}
                                    placeholder="Enter Content"
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="image">Image URL:
                                <input
                                    type="text"
                                    name="image"
                                    value={blogDetails.image}
                                    onChange={handleChange}
                                    placeholder="Enter Image URL"
                                    required
                                />
                            </label>
                        </div>
                        <div className={styles.editBtn}>
                            <button type="submit" className={styles.submitButton}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBlog