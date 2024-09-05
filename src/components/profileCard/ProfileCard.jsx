/* eslint-disable react/prop-types */
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./styles/styles.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FollowListModal from "../followListModal/FollowListModal";
import Modal from "../modal/Modal";
import EditProfile from "../editProfile/EditProfile";
import { useSelector } from "react-redux";
import { useFollowMutation, useGetUserDataMutation, useUnfollowMutation } from "../../reduxToolkit/slices/apiSlice";
import { toast } from "react-toastify";

const ProfileCard = ({ articleCount = true, user, blogsCount,comp }) => {

  const [showFollowingModal, setShowFollowingModal] = useState(false)
  const [showFollowerModal, setShowFollowerModal] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const { author } = useSelector((state) => state.userData)
  const isOwnProfile = author?.username === user?.username;
  
  const { username, profileImg, niche, bio, _id,} = user
  const userId =  _id || author?.userId
   const profileImage = `http://localhost:8000/${profileImg}`
  const [follow, { isFollowLoading }] = useFollowMutation()
  const [unfollow, { isunfollowLoading }] = useUnfollowMutation()
  const [isFollowing,setIsFollowing] = useState(false)
  const  [getUserData,{isLoading:fetchedUserDetailsLoading,isError:fetchedUserDetailsError}] =useGetUserDataMutation()
  const [followCounts,setFollowCounts] = useState({followingCount:0,
    followerCount:0
  })

  function onCloseFollowing() {
    setShowFollowingModal(false)
  }

  function onCloseFollower() {
    setShowFollowerModal(false)
  }

  async function fetchUserDetails() {

    try {
      const response = await getUserData(userId).unwrap()

       if (response.status === 200) {
        const {followingsCount,followersCount} = response.data
        setFollowCounts({followingCount:followingsCount,followerCount:followersCount})
       }
      else {
        toast.error(response.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Something went wrong,please try again')
    }
  }

  async function handleFollow() {

    try {
      setFollowCounts(prev => ({
        ...prev,
        followerCount: prev.followerCount + 1
      }));
      const response = await follow(_id, username,name, profileImg).unwrap()
       if (response.status === 200) {
        
        toast.success(`You started following ${user.username}`)
        setIsFollowing(true)
      }
      else{
        setFollowCounts(prev => ({
          ...prev,
          followerCount: prev.followerCount - 1
        }));
        toast.error(response.message)
      }
    }
    catch (error) {
      console.log(error)
      toast.error('Something went wrong, please try again')
     }
  }

  async function handleUnfollow() {

    try {
      setFollowCounts(prev => ({
        ...prev,
        followerCount: prev.followerCount - 1
      }));
      const response = await unfollow(_id).unwrap()

      if (response.status === 200) {
        toast.success(`You unfollowed ${user.username}`)
        setIsFollowing(false)
      }
    }
    catch (error) {
      setFollowCounts(prev => ({
        ...prev,
        followerCount: prev.followerCount + 1
      }));
       toast.error(error)
    }
  }

  function handleEditProfile() {
    setEditProfile(true)
  }

  function closeEditProfile() {
    setEditProfile(false)
  }

  useEffect(()=>{
    if(comp==='profile'){
      fetchUserDetails()
    }
  },[userId])

  return (
    <div className={styles.user_details_container}>

      <Link to={`/profile/${username}`} state={user} >
        {user.profileImg ?
          <img src={profileImage} alt="Profile Image" className={styles.profileImg} /> :
          <p className={styles.defaultImg}
            style={{ "background": `linear-gradient(135deg, ${randomProfileBg()[0]} 0%, ${randomProfileBg()[1]} 100%)` }}>
            {user?.name?.charAt(0).toUpperCase()}
          </p>
        }
      </Link>
      <div className={styles.user_details}>
        <p className={styles.name}>{username}</p>
        {articleCount && <div className={styles.article_followlist_container}>
          <span>{blogsCount} Blogs</span>
          <span className={styles.followList} onClick={() => setShowFollowingModal(true)}>{followCounts.followingCount } Followings</span>
          <span className={styles.followList} onClick={() => setShowFollowerModal(true)}>{followCounts.followerCount} Followers</span>

          <Modal isOpen={showFollowingModal} onClose={onCloseFollowing}>
            <FollowListModal onClose={onCloseFollowing} isOpen={showFollowingModal} list='Followings' userId={isOwnProfile ? author.userId :userId} setIsFollowing={setIsFollowing} setShowModal={setShowFollowingModal} setFollowCounts={setFollowCounts}/>
          </Modal>
          <Modal isOpen={showFollowerModal} onClose={onCloseFollower}>
            <FollowListModal onClose={onCloseFollower} isOpen={showFollowerModal} list='Followers' userId={isOwnProfile ? author.userId :userId} setIsFollowing={setIsFollowing} setShowModal={setShowFollowerModal} setFollowCounts={setFollowCounts}/>
          </Modal>

        </div>
        }
        <div className={styles.profile_btns}>
          {!isOwnProfile && <span className={styles.niche} onClick={!isFollowing ? handleFollow : handleUnfollow}>{!isFollowing ? 'Follow' : 
            'Unfollow'}</span>}
          <span className={styles.niche}>{!niche ? 'Niche' : niche}</span>
          {isOwnProfile && <span className={styles.niche} onClick={handleEditProfile}>Edit Profile</span>}

          <Modal isOpen={editProfile} onClose={closeEditProfile}>
            <EditProfile isOpen={editProfile} onClose={closeEditProfile} />
          </Modal>

          {isOwnProfile && niche ? (
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

  return randomBg;
}

export default ProfileCard;


 