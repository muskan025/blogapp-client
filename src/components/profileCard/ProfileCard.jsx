/* eslint-disable react/prop-types */
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import profile from "../../assets/profile1.jpg";
import styles from "./styles/styles.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import FollowListModal from "../followListModal/FollowListModal";
import Modal from "../modal/Modal";

const ProfileCard = ({ articleCount = true, userId }) => {

    const [showFollowingModal,setShowFollowingModal] = useState(false)
    const [showFollowerModal,setShowFollowerModal] = useState(false)

    function onCloseFollowing(){
      setShowFollowingModal(false)
    }
    function onCloseFollower(){
      setShowFollowerModal(false)
    }

  return (
    <div className={styles.user_details_container}>
      <Link to={`/profile/${userId}`}>
        <img src={profile} alt="Profile Image" />
      </Link>
      <div className={styles.user_details}>
        <p className={styles.name}>Hi, I&apos;m David Smith</p>
        {articleCount && <div className={styles.article_followlist_container}>
        <span>13 Blogs</span>
        <span className={styles.followList} onClick={()=>setShowFollowingModal(true)}>Following</span>
        <span className={styles.followList} onClick={()=>setShowFollowerModal(true)}>Followers</span>

        <Modal isOpen={showFollowingModal} onClose={onCloseFollowing}>
      <FollowListModal onClose={onCloseFollowing} isOpen={showFollowingModal} heading='Following' name="following"/>
    </Modal>
        <Modal isOpen={showFollowerModal} onClose={onCloseFollower}>
      <FollowListModal onClose={onCloseFollower} isOpen={showFollowerModal} heading='Followers' name="follower"/>
    </Modal>

        </div>
        }
        <span className={styles.niche}>Follow</span>
        <p className={styles.bio}>
          I&apos;m David Smith, husband and father, I love Photography, travel
          and nature. I&apos;m working as a writer and blogger with experience
          of 5 years until now.
        </p>

        <ul className={styles.social_media_icons_container}>
          <li className={`${styles.social_media_icons} ${styles.facebook}`}>
            <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </Link>
          </li>
          <li className={`${styles.social_media_icons} ${styles.instagram}`}>
            <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </Link>
          </li>
          <li className={`${styles.social_media_icons} ${styles.x}`}>
            <Link to="https://www.x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </Link>
          </li>
          <li className={`${styles.social_media_icons} ${styles.youtube}`}>
            <Link to="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
