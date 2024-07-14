/* eslint-disable react/prop-types */
import profileImg from "../../assets/profile1.jpg"
import styles from "./styles/styles.module.css"
import { Link } from "react-router-dom"
import { InputField } from "../../common/input/Form"

const FollowListModal = ({ heading, name }) => {
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
