import { NavLink } from "react-router-dom";
import { Button, FileField, FormName, InputField } from "../common/input/Form";
import styles from '../styles/index.module.css';

const SignUp = () => {
  return (
    <main>
      <div className={styles.form_container}>
        <div className={styles.form_sub_container}>
          <FormName name="Sign Up" />
          <form>
            <InputField type="text" name="username" placeholder="Username*" />
            <InputField type="email" name="email" placeholder="Email Address*" />
            <InputField type="password" name="password" placeholder="Password*" />
            <FileField name="profileImage" placeholder="Upload Picture" />
            <Button name="Sign Up Now" width="100%" />
          </form>
          <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
