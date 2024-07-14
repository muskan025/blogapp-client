import { NavLink } from "react-router-dom"
import { Button, FormName, InputField } from "../common/input/Form"
import styles from '../styles/index.module.css'

const Login = () => {
  return (
    <main>
       
     <div className={styles.form_container}>
     <div className={styles.form_sub_container}>
     <FormName name="Login"/>
     <form>
      <InputField type="text" name="loginId" placeholder="Username / Email Address*" />

      <InputField type="password" name="password" placeholder="Password*" />
      <Button name="Login Now" width="100%"/>
    </form>
    <p>Don&apos;t have an account? <NavLink to="/sign-up">Create One</NavLink></p>
     </div>
     </div>
   
    </main>
  )
}

export default Login
