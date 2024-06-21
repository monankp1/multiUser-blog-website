import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Blogs from '../../Components/Blogs/Blogs';
import About from '../../Components/About/About';
import Login from '../../Components/Login/Login';
import AddUser from '../../Components/AddUser/AddUser';
import styles from './Home.module.css';
import AddBlog from '../../Components/AddBlog/AddBlog';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  // const [logIn, setLogIn] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, userRole, userName, users } = useSelector((state) => state.user);



  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user) {
  //     setLogIn(true);
  //   } else {
  //     setLogIn(false);
  //   }
  // }, [showLoginModal, isLoggedIn]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'user_login', payload: { user } });
    }
  }, [dispatch]);




  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(`${BACKEND_ENDPOINT}/users`);
  //     dispatch(actions.setUsers(res.data));
  //   };

  //   fetchData();
  // }, [dispatch]);


  useEffect(() => {
    dispatch({ type: 'user_fetchUsers' });
  }, [dispatch]);


  const handleLogin = () => {
    setShowLoginModal(true);
  };



  // const handleLogout = () => {
  //   localStorage.removeItem('user');
  //   dispatch(actions.logoutUser());
  // };
  const handleLogout = () => {
    dispatch({ type: 'user_logout' });
  };




  const handleCloseLogin = () => {
    setShowLoginModal(false);
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'user_login', payload: { user } });
    }
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };


  const handleCloseAddUser = () => {
    setShowAddUserModal(false);
  };

  const handleAddBlog = () => {
    setShowAddBlogModal(true);
  };

  const handleCloseAddBlog = () => {
    setShowAddBlogModal(false);
  }

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userRole={userRole}
        handleAddUser={handleAddUser}
        handleAddBlog={handleAddBlog}
      />
      <Blogs userRole={userRole} userName={userName} showAddBlogModal={showAddBlogModal} />
      <About />
      <Login show={showLoginModal} handleClose={handleCloseLogin} users={users} />
      <AddUser show={showAddUserModal} handleClose={handleCloseAddUser} />
      <AddBlog show={showAddBlogModal} handleClose={handleCloseAddBlog} />
    </div>
  );
};

export default Home;
