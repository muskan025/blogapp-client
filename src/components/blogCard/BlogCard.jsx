/* eslint-disable react/prop-types */
import profileImg from "../../assets/profile1.jpg";
import styles from "./styles/styles.module.css";
import BannerImage from "../BannerImage";
import { BiHeart, BiShare, BiDotsHorizontalRounded} from "react-icons/bi";
import { BlogExcerpt } from "../../pages/SingleBlog";
import { Link } from "react-router-dom";
import { AboutExcerpt } from "../../pages/AboutUs";
import aboutImg from "../../assets/image3.png"
import { useState } from "react";
import { BsPen, BsTrash } from "react-icons/bs";

const BlogCard = ({ image = true, blogHeader = true, comp = "self", titleFont, userId, blogId, blogImage, niche, blogTitle, textBody, username, date, data }) => {

  const [showMore,setShowMore] = useState(false)
  return (
    <div className={styles.masonry_item}>
      {
        image ? (<div className={styles.blog_img_container}>
          <Link to={`/blog/${blogId}`} state={data}>
            <img src={blogImage} alt="Blog Image" className={styles.blog_img} />
          </Link>
        </div>) : (comp === "single_blog" ? <BannerImage image={blogImage} blogId={blogId} /> : (<BannerImage image={aboutImg} />))
      }
      {
        blogHeader && <div className={styles.blog}>
          <div className={styles.niche__interactive_container}>
            <p className={styles.niche}>{niche}</p>
            {
              comp === "self" && <ul className={styles.interactive_container}>
                <li onClick={()=> setShowMore(!showMore)} className={styles.showmore_container}>
                  <BiDotsHorizontalRounded />
                  {
                    showMore && <ul>
                    <li>
                      <BsPen /> 
                      <span>Edit</span>
                      </li>
                    <li className={styles.delete}>
                       <BsTrash /> 
                      <span>Delete</span>
                      </li>
                  </ul>
                  }
                </li>
                <li>
                  <BiHeart className={styles.heart} />
                  <span>44.5M</span>
                </li>
                <li>
                  <BiShare className={styles.share} />
                </li>

              </ul>
            }
          </div>
          <Link to={`/blog/${blogId}`} state={data} className={styles.title_container}>
            <h1 className={styles.title} style={`${titleFont}` && { "fontSize": `${titleFont}` }}>
              {blogTitle}
            </h1>
          </Link>
          {comp === "self" && <p className={styles.info}>
            {textBody}
          </p>}
          

            <UserDetails userId={userId} username={username} date={date} comp={comp} />
          
        </div>
      }
      {
        comp === "single_blog" ? <BlogExcerpt /> : comp === "about" && <AboutExcerpt />
      }
    </div>
  );
};


export const UserDetails = ({ userId, username, date, comp }) => {

  return (
    <div className={styles.blogger_details}>
    <div className={styles.profile_img}>
    <Link to={`/profile/${userId}`} >
      <img src={profileImg} alt="Profile Image" />
      <span className={styles.blogger_name}>{username}</span>
    </Link>
  </div>
            <div>
              
              <span className={styles.dot_one}></span>

              <span className={styles.date}>{date}</span>
              {(comp === "single_blog" || comp === "carousel") &&
                <>
                  <span className={styles.dot}></span>
                  <span className={styles.read_time}>15 Min Read</span>
                </>
              }
            </div>
            </div>

  )
}
export default BlogCard;
