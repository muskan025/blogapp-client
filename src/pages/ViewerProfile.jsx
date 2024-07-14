import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import styles from "../styles/index.module.css";
import BlogCards from "../components/blogCards/BlogCards";
import ProfileCard from "../components/profileCard/ProfileCard";

const ViewerProfile = () => {
  const { userId } = useParams();
  const [isSettings, setIsSettings] = useState(false);

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
            <p className={`${styles.logout} ${styles.options}`}>Logout</p>
            <p className={`${styles.logoutAll} ${styles.options}`}>Logout from all devices</p>
            <p className={`${styles.delete_account} ${styles.options}`}>Delete Account</p>
          </div>
        )}
      </div>
      <ProfileCard userId={userId} />
      <div className={styles.user_blogs}>
        <BlogCards />
      </div>
    </main>
  );
};

export default ViewerProfile;