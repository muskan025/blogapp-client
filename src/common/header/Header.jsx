import { NavLink, Link, useLocation } from "react-router-dom"
import styles from "./styles/styles.module.css"
import { useSelector } from "react-redux"
import { randomProfileBg } from "../../components/profileCard/ProfileCard"
import { toast } from "react-toastify"

const Header = () => {
  const { author,profileImg,isAuth} = useSelector((state) => state.userData)
  const username = author?.username
  const profileImage = `http://localhost:8000/${profileImg}`
  const location = useLocation()
 
  function checkisAuth(e){
    if(!isAuth){
      e.preventDefault()
      toast.info('Session expired, please login')
    }
  }

  const getLinkState = () => {
    if (isAuth) {
       return author 
    } else {
    
       return location.state
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link to="/">
          <div className={styles.brandname}>
            Live<span className={styles.blogname}>Up</span>
          </div>
        </Link>
        <div className={styles.nav_links_center}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active_Link : ""}>
            Home
          </NavLink>
          <NavLink to="/about-us" className={({ isActive }) => isActive ? styles.active_Link : ""}>
            About Us
          </NavLink>
          <NavLink to="/explore-blogs" className={({ isActive }) => isActive ? styles.active_Link : ""}>
            Explore Blogs
          </NavLink>
          {
            <NavLink to="/sign-up" className={({ isActive }) => isActive ? styles.active_Link : ""}>
              Sign Up
            </NavLink>
          }
          {
            <NavLink to="/login" className={({ isActive }) => isActive ? styles.active_Link : ""}>
              Login
            </NavLink>
          }

        </div>
       
        <div className={styles.profile_img} onClick={(e)=>checkisAuth(e)}>
            <Link to={isAuth ? `/profile/${username}`: location.pathname} state={getLinkState()}>
               <img src={profileImage} alt="Profile" /> :
                <div className={styles.defaultProfile} style={{ "background": `linear-gradient(135deg, ${randomProfileBg()[0]} 0%, ${randomProfileBg()[1]} 100%)` }}>{author?.name?.charAt(0).toUpperCase()}</div>
            </Link>
          </div>
          
      </nav>
    </header>
  )
}

export default Header