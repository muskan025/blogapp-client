import { NavLink } from "react-router-dom"
import error from "../assets/error.png"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"
import { Button } from "../common/input/Form"
import styles from "../styles/index.module.css"

const Error = () => {
  return (
    <>
    <Header/>
    <main>
     <div className={styles.error_page}>
     <img src={error} alt=""  />
     <p>Oops! This page can’t be found</p>
     <Button name="Go Back Home"><NavLink to="/">Go Back Home</NavLink></Button>
     </div>
    </main>
    <Footer/>
    </>
  )
}

export default Error
