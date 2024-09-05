import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import styles from "../styles/index.module.css";
import BlogCards from "../components/blogCards/BlogCards";
import ProfileCard from "../components/profileCard/ProfileCard";
import { toast } from 'react-toastify';
import { useGetAllBlogsQuery, useGetUserBlogsMutation, useLogoutFromAllDevicesMutation, useLogoutMutation } from '../reduxToolkit/slices/apiSlice';
import { clearUser, setAuthStatus, setUser } from '../reduxToolkit/slices/userSlice';
import { setMyBlogs } from '../reduxToolkit/slices/blogSlice';

const ViewerProfile = () => {

  const [isSettings, setIsSettings] = useState(false);
  const { author,isAuth } = useSelector((state) => state.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation();
  const userId = state?.userId || state?._id
   
  const [logout, { isLogoutLoading }] = useLogoutMutation();
  const [logoutFromAllDevices, { isLogoutDevicesloading }] = useLogoutFromAllDevicesMutation();
  const [getUserBlogs, { isBlogsLoading }] = useGetUserBlogsMutation()
  const [fetchedBlogs, setFetchedBlogs] = useState([])
  const isOwnProfile = isAuth && author?.username === state?.username;
 
  async function fetchUserBlogs() {

    try {

      const response = await getUserBlogs(userId).unwrap()
      const data = response.data
       if (response.status === 200) {
        setFetchedBlogs(data)

        if (userId === author?._id) dispatch(setMyBlogs(data))
      }
      else if (response.status === 401) {
        toast.info(response.message)
        navigate(-1)
      }
      else {
        toast.error(response.message)
      }

    }
    catch (error) {
      toast.error("Something went wrong")
    }

  }

  async function handleLogout(func) {
 
    try {
      const response = await func().unwrap()

      if (response.status === 200) {
        dispatch(clearUser());
        navigate('/')
      }
      else {
        toast.error(response.message || "Logout failed!")
      }
    }
    catch (error) {
      toast.error("Logout failed!")
    }
  }

  useEffect(() => {
   fetchUserBlogs()
  }, [userId]);

  if (!state) {
    dispatch(setAuthStatus(false));
    navigate(-1);
    return null;
  }

  if (isBlogsLoading) {
    return <p>Loading...</p>;
  }

  return (

    <main className={styles.user_profile}>
      {
        isOwnProfile && <div className={styles.settings}  onClick={() => setIsSettings(!isSettings)} onMouseEnter={() => setIsSettings(!isSettings)}>
        <div className={`${styles.settings_header}`}>
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
      }
    <ProfileCard user={state} blogsCount={fetchedBlogs.length} comp='profile'/>

      <div className={styles.user_blogs}>
        {fetchedBlogs?.length === 0 ? <h1>No blogs yet, create some!</h1> :
          <BlogCards data={fetchedBlogs} comp="profile" />
        }
      </div>
    </main>
  );
};

export default ViewerProfile;