/* eslint-disable react/prop-types */
 import styles from "./styles/styles.module.css"
import { Link } from "react-router-dom"
import { InputField } from "../../common/input/Form"
import { useSelector } from "react-redux"

const FollowListModal = ({ heading, name }) => {

    const {user} = useSelector((state)=>{state.userData})
    const {profileImg} =user
    return (
        
        <div className={styles.followlist_container}>
            <p>{heading}</p>
            <form action="">
                <div>
                    <InputField type="text" name={name} placeholder="Search" />
                </div>
            </form>
            <ul>
                <li>
                    <Link>
                        <img src={profileImg} alt="" />
                        <span>Muskan</span></Link>
                    {name === "following" && <div className={styles.btn}>
                        <span>Unfollow</span>
                    </div>
                    }
                </li>
                <li>
                    <Link>
                        <img src={profileImg} alt="" />
                        <span>Muskan</span></Link>
                    {name === "following" && <span className={styles.btn}>Unfollow</span>}
                </li>
                <li>
                    <Link>
                        <img src={profileImg} alt="" />
                        <span>Muskan</span></Link>
                    {name === "following" && <span className={styles.btn}>Unfollow</span>}
                </li>

            </ul>
        </div>
    )
}

export default FollowListModal
