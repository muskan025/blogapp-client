import { NavLink, useNavigate } from "react-router-dom"
import { Button, FormName, InputField } from "../common/input/Form"
import styles from '../styles/index.module.css'
import { useDispatch, useSelector} from "react-redux"
import { useForm } from "../hooks/useForm"
import { toast } from "react-toastify"
import { useLoginMutation } from "../reduxToolkit/slices/apiSlice"
import { setUser } from "../reduxToolkit/slices/userSlice"

const Login = () => {

  const initialState = {
    loginId: '',
    password: '',
  };

  const { formData, handleChange, resetForm } = useForm(initialState)
  const navigate = useNavigate()
  const dispatch = useDispatch()
   const [login, { isLoading }] = useLoginMutation()


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await login(formData).unwrap();
      const user = response.data
       if (response.status === 200) {
        dispatch(setUser(response.data))
        const username = response.data.username
        resetForm()
        navigate(`/profile/${username}`, {state:user});
      }
      else {
        toast.error(response.message || "Login failed");
      }

    } catch (error) {
        toast.error("Login failed");
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }


  return (

    <main>
      <div className={styles.form_container}>
        <div className={styles.form_sub_container}>
          <FormName name="Login" />
          <form onSubmit={handleSubmit}>
            <InputField type="text" name="loginId" placeholder="Username / Email Address*" value={formData.username ? formData.username : formData.email} onChange={handleChange} />
            <InputField type="password" name="password" placeholder="Password*" value={formData.password} onChange={handleChange} />
            <Button name={isLoading ? "Logging in..." : "Login Now"} width="100%" />
          </form>
          <p>Don&apos;t have an account? <NavLink to="/sign-up">Create One</NavLink></p>
        </div>
      </div>
    </main>
  )
}

export default Login
