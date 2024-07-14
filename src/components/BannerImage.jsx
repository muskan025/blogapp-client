/* eslint-disable react/prop-types */
import styles from "../components/blogCard/styles/styles.module.css"
 
const BannerImage = ({image}) => {
     return (
            
            <img src={image} alt="Blog Image" className={styles.landscape_img}/>
           
    )
  }

  export default BannerImage