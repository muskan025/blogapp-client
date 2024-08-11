/* eslint-disable react/prop-types */
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import defaultProfile from '../../assets/profile.png'
import styles from "./styles/styles.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import FollowListModal from "../followListModal/FollowListModal";
import Modal from "../modal/Modal";
import EditProfile from "../editProfile/EditProfile";
import { useSelector } from "react-redux";

const ProfileCard = ({ articleCount = true, user}) => {

  console.log(user)
    const [showFollowingModal,setShowFollowingModal] = useState(false)
    const [showFollowerModal,setShowFollowerModal] = useState(false)
    const [editProfile,setEditProfile] = useState(false)
  const {myBlogs} = useSelector((state)=>state.blogData)
    const blogsCount = myBlogs.length
    const {author,isAuth} = useSelector((state)=>state.userData)
    const isOwnProfile =  author?.username === user?.username;
    console.log(author)
    console.log(user?.username,isOwnProfile)
    
    const {username,profileImg,niche,bio} = user
     const profileImage = `http://localhost:8000/${profileImg}`

    function onCloseFollowing(){ 
      setShowFollowingModal(false)
    }
    function onCloseFollower(){
      setShowFollowerModal(false)
    }

    function handleEditProfile(){
      setEditProfile(true)
    }

    function closeEditProfile(){
      setEditProfile(false)
    }

   return (
    <div className={styles.user_details_container}>

       <Link to={`/profile/${username}`} >
        { user.profileImg ?
          <img src={profileImage} alt="Profile Image" className={styles.profileImg} />:
          <p className={styles.defaultImg} 
          style={{ "background": `linear-gradient(135deg, ${randomProfileBg()[0]} 0%, ${randomProfileBg()[1]} 100%)`}}>
            {user?.name?.charAt(0).toUpperCase()}
          </p>
          }
      </Link>
      <div className={styles.user_details}>
        <p className={styles.name}>{username}</p>
        {articleCount && <div className={styles.article_followlist_container}>
        <span>{blogsCount} Blogs</span>
        <span className={styles.followList} onClick={()=>setShowFollowingModal(true)}>0 Following</span>
        <span className={styles.followList} onClick={()=>setShowFollowerModal(true)}>0 Followers</span>

        <Modal isOpen={showFollowingModal} onClose={onCloseFollowing}>
      <FollowListModal onClose={onCloseFollowing} isOpen={showFollowingModal} heading='Following' name="following"/>
    </Modal>
        <Modal isOpen={showFollowerModal} onClose={onCloseFollower}>
      <FollowListModal onClose={onCloseFollower} isOpen={showFollowerModal} heading='Followers' name="follower"/>
    </Modal>

        </div>
        }
        <div className={styles.profile_btns}>
     { !isOwnProfile && <span className={styles.niche}>Follow</span> }  {/* raise toast on follow */}
        <span className={styles.niche}>{!niche ? 'Niche' : niche}</span>
       { isOwnProfile && <span className={styles.niche} onClick={handleEditProfile}>Edit Profile</span>}

        <Modal isOpen={editProfile} onClose={closeEditProfile}>
          <EditProfile isOpen={editProfile} onClose={closeEditProfile}/>
        </Modal>
        
        { isOwnProfile && niche ? (
            <Link to={`/create-blog/${username}`}>
              <span className={styles.niche}>Create Blog</span>
            </Link>
          ) : (
            isOwnProfile && <span className={`${styles.niche} ${styles.disabled}`} title="Edit profile to add niche">
              Create Blog
            </span>
          )}
        
        </div>
        <p className={styles.bio}>{bio}</p>

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

export function randomProfileBg() {
    
   function randomClr() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      
       for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      
      return color;
  }

  const randomBg = [randomClr(), randomClr()];
  
  console.log("randomBg",randomBg)
  return randomBg;
}

export default ProfileCard;
