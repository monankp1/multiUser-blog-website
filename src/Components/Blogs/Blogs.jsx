import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../../api';
import styles from './Blogs.module.css';
import EditBlog from '../EditBlog/EditBlog';

const Blogs = ({ userRole, userName, showAddBlogModal }) => {
  const [blogs, setBlogs] = useState([]);
  const [editBlogModal, setEditBlogModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BACKEND_ENDPOINT}/blogs`);
        setBlogs(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [editBlogModal, showAddBlogModal]);

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setEditBlogModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BACKEND_ENDPOINT}/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEditBlog = () => {
    setEditBlogModal(false);
    setCurrentBlog(null);
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );
  };

  return (
    <div className={styles.container}>
      {Array.isArray(blogs) && blogs.map((blog) => (
        <div className={styles.card} key={blog.id}>
          <img src={blog.image} alt={blog.title} />
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className={styles.cardFooter}>
            <p>{blog.author}</p>
            <p>Posted on: {blog.date}</p>

          </div>
          {(userRole === 'author' && userName === blog.author) && (
            <button className={styles.editButton} onClick={() => handleEdit(blog)}>Edit</button>
          )}
          {(userRole === 'editor') && (
            <button className={styles.editButton} onClick={() => handleEdit(blog)}>Edit</button>
          )}
          {(userRole === 'admin') && (
            <>
              <button className={styles.editButton} onClick={() => handleEdit(blog)}>Edit</button>
              <button className={styles.deleteButton} onClick={() => handleDelete(blog.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      {editBlogModal && (
        <EditBlog
          show={editBlogModal}
          handleClose={handleCloseEditBlog}
          blog={currentBlog}
          handleUpdateBlog={handleUpdateBlog}
        />
      )}
    </div>
  );
}

export default Blogs;
