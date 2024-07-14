import { NavLink, Link } from "react-router-dom"
import styles from "./styles/styles.module.css"

const Header = () => {
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
          <NavLink to="/sign-up" className={({ isActive }) => isActive ? styles.active_Link : ""}>
            Sign Up
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? styles.active_Link : ""}>
            Login
          </NavLink>
        </div> 
        <div className={styles.profile_img}>
          <Link to="/profile">          
             <img src="https://i.pinimg.com/564x/b0/91/d4/b091d4acb4d625aeabcdecb7ecc573d3.jpg" alt="Profile" />
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header