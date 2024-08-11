import { NavLink, Link } from "react-router-dom"
import styles from "./styles/styles.module.css"
import { useSelector } from "react-redux"
import { randomProfileBg } from "../../components/profileCard/ProfileCard"

const Header = () => {
  const { user, isAuth } = useSelector((state) => state.userData)
  const username = user?.username
  const profileImage = `http://localhost:8000/${user?.profileImg}`


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
        {
          isAuth && <div className={styles.profile_img}>
            <Link to={`/profile/${username}`} state={user}>
              {user?.profileImg ? <img src={profileImage} alt="Profile" /> :
                <div className={styles.defaultProfile} style={{ "background": `linear-gradient(135deg, ${randomProfileBg()[0]} 0%, ${randomProfileBg()[1]} 100%)` }}>{user?.name?.charAt(0).toUpperCase()}</div>}
            </Link>
          </div>
        }
      </nav>
    </header>
  )
}

export default Header