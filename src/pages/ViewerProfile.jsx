import { useEffect, useState } from 'react';
import {useDispatch } from 'react-redux';
import { useLocation} from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import styles from "../styles/index.module.css";
import BlogCards from "../components/blogCards/BlogCards";
import ProfileCard from "../components/profileCard/ProfileCard";
import { toast } from 'react-toastify';
import { useGetMyBlogsQuery, useLogoutFromAllDevicesMutation, useLogoutMutation } from '../reduxToolkit/slices/apiSlice';
import { clearUser } from '../reduxToolkit/slices/userSlice';
import { setMyBlogs } from '../reduxToolkit/slices/blogSlice';

const ViewerProfile = () => {

  const [isSettings, setIsSettings] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();
  const [logoutFromAllDevices, { loading }] = useLogoutFromAllDevicesMutation();
  const  { data: myBlogs, isLoading: blogLoading, error: blogError} =  useGetMyBlogsQuery()
  const {state} = useLocation()
  const dispatch = useDispatch()
  async function handleLogout(func, message) {

    try {

      const response = await func().unwrap()
      if (response.status === 200) {
        dispatch(clearUser());
        toast.success(message)
      }
      else {
        toast.error(response.message || "Logout failed!")
      }
    }
    catch (error) {
      console.log(error)
      toast.error("Logout failed!")
    }
  }

  useEffect(() => {
    console.log("myBlogs out",myBlogs)
    if (myBlogs) {
      console.log("myBlogs",myBlogs)
       dispatch(setMyBlogs(myBlogs));
    }
  }, [myBlogs, dispatch]);

  if (blogLoading) {
    return <p>Loading...</p>;
  }
 

  if (blogError) {
    toast.error("Error fetching blogs");
  }

   return (
 
    <main className={styles.user_profile}>
      <div className={styles.settings}>
        <div
          className={`${styles.settings_header}`}
          onClick={() => setIsSettings(!isSettings)}
        >
          <span>Settings</span>
          <CiSettings className={styles.icon} />
        </div>
        {isSettings && (
          <div className={styles.options_container}>
            <p className={`${styles.logout} ${styles.options}`} onClick={() => handleLogout(logout, "Logout successful!")}>Logout</p>
            <p className={`${styles.logoutAll} ${styles.options}`} onClick={() => handleLogout(logoutFromAllDevices, "Logout from all devices successful!")}>Logout from all devices</p>
            <p className={`${styles.delete_account} ${styles.options}`}>Delete Account</p>
          </div>
        )}
      </div>
      <ProfileCard user={state}/>
    
      <div className={styles.user_blogs}>
        { myBlogs?.length === 0 ? <h1>No blogs yet, create some!</h1> :
        <BlogCards data={myBlogs} comp="profile"/>
       }
      </div>
    </main>
  );
};

export default ViewerProfile;